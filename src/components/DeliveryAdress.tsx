import { FormEvent, useCallback, useEffect } from 'react'
import { useGlobalContext } from '../contexts/GlobalContext'
import { Adress, useUserContext } from '../contexts/UserContext'
import useFetch from '../hooks/useFetch'
import Button from './Button'
import CrudCard from './CrudCard'
import Heading from './Heading'
import Input from './Input'
import { AnimationAdress } from './Lottie'
import Modal from './Modal'

interface DeliveryAdressProps {
  orientation: 'horizontal' | 'vertical'
}

const DeliveryAdress = ({ orientation }: DeliveryAdressProps) => {
  const { isMobile, editMode, setEditMode, modalStatus, setModalStatus } =
    useGlobalContext()

  const {
    currentUser,
    setActiveAdress,
    adressDataForm,
    setAdressDataForm,
    setAdress,
    updateAdress,
    deleteAdress
  } = useUserContext()

  const { request, data } = useFetch()

  useEffect(() => {
    if (adressDataForm?.postalCode?.length === 9) {
      let postalCode = adressDataForm?.postalCode.replace(/\D/g, '')
      request(`https://viacep.com.br/ws/${postalCode}/json/`)
    }
  }, [adressDataForm?.postalCode])

  useEffect(() => {
    setAdressDataForm({
      ...adressDataForm,
      street: data?.logradouro,
      neighborhood: data?.bairro,
      city: data?.localidade,
      state: data?.uf
    })
  }, [data])

  const handleAdress = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setAdressDataForm({
        ...adressDataForm,
        [e.currentTarget.name]: e.currentTarget.value
      })
    },
    [adressDataForm]
  )

  const handleCreateAdress = () => {
    setAdress()
    setModalStatus(null)
  }

  const handleDeleteAdress = () => {
    setModalStatus('confirmationModal')
  }

  const handleEditAdress = (arg: number) => {
    setEditMode(true)
    if (currentUser?.adressList)
      setAdressDataForm(currentUser?.adressList?.[arg])

    setModalStatus('createAdressModal')
  }

  const handleUpdateAdress = () => {
    if (typeof currentUser?.selectedAdress === 'number') {
      updateAdress(currentUser.selectedAdress)
    }
    setModalStatus(null)
  }

  const handleSubmitAdress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editMode ? handleUpdateAdress() : handleCreateAdress()
  }

  const handleConfirmationModal = () => {
    if (typeof currentUser?.selectedAdress === 'number') {
      deleteAdress(currentUser.selectedAdress)
      setModalStatus(null)
    }
  }

  return (
    <>
      {currentUser?.adressList?.length ? (
        <ul
          className={`
            flex gap-6
              ${orientation === 'vertical' && 'flex-col items-end'}
              ${orientation === 'horizontal' && 'flex-row my-6 justify-center'}
              ${isMobile && 'flex-col items-center'}
            `}
        >
          {currentUser?.adressList?.map(
            (
              {
                street,
                number,
                complement,
                neighborhood,
                city,
                state,
                postalCode
              },
              idx
            ) => {
              return (
                <CrudCard
                  key={idx}
                  isActive={idx === currentUser.selectedAdress}
                  onClick={() => setActiveAdress(idx)}
                  handleDeleteButton={handleDeleteAdress}
                  handleUpdateButton={() => handleEditAdress(idx)}
                >
                  <p>
                    {street}, {number}, {complement}
                  </p>
                  <p>{neighborhood}</p>
                  <p>
                    {city}/{state}
                  </p>
                  <p>{postalCode}</p>
                </CrudCard>
              )
            }
          )}
        </ul>
      ) : (
        <div className="flex justify-center items-center flex-col gap-4">
          <AnimationAdress />
          <p className="text-primary text-center">
            Nenhum endereço cadastrado.
          </p>
        </div>
      )}
      <div
        className={`flex ${
          currentUser?.adressList?.length
            ? 'flex-row-reverse'
            : 'justify-center'
        }`}
      ></div>

      <div
        className={`
          flex my-6
          ${currentUser?.adressList?.length ? 'justify-end' : 'justify-center'}
          ${orientation === 'horizontal' && 'justify-center lg:mr-6'}
        `}
      >
        <Button
          primary
          text="Cadastrar novo"
          onClick={() => {
            setEditMode(false)
            setAdressDataForm({} as Adress)
            setModalStatus('createAdressModal')
          }}
        />
      </div>

      {modalStatus === 'createAdressModal' && (
        <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
          <form
            onSubmit={(e) => handleSubmitAdress(e)}
            className="m-auto flex flex-col gap-6 w-full md:w-80"
          >
            <Heading
              text={editMode ? 'Editar endereço' : 'Novo endereço'}
              small
              center
            />
            <Input
              text="CEP:"
              maxLength={9}
              name="postalCode"
              htmlFor="adressPostalCode"
              required
              widthFull
              placeholder="00000-000"
              onChange={handleAdress}
              mask="postalCodeMask"
              value={adressDataForm?.postalCode}
            />
            <Input
              text="Logradouro:"
              name="street"
              htmlFor="adressStreet"
              required
              widthFull
              onChange={handleAdress}
              value={adressDataForm?.street}
            />

            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 2fr 8fr'
              }}
            >
              <Input
                text="Número:"
                name="number"
                htmlFor="adressNumber"
                required
                widthFull
                onChange={handleAdress}
                value={adressDataForm?.number}
              />
              <Input
                text="Complemento:"
                name="complement"
                htmlFor="adressComplement"
                widthFull
                onChange={handleAdress}
                value={adressDataForm?.complement}
              />
              <div className="col-span-2 lg:col-auto flex items-center">
                <Input
                  text="Bairro:"
                  name="neighborhood"
                  htmlFor="adressNeighborhood"
                  required
                  widthFull
                  onChange={handleAdress}
                  value={adressDataForm?.neighborhood}
                />
              </div>
            </div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: '10fr 2fr' }}
            >
              <Input
                text="Cidade:"
                name="city"
                htmlFor="adressCity"
                required
                widthFull
                onChange={handleAdress}
                value={adressDataForm?.city}
              />
              <Input
                text="UF:"
                maxLength={2}
                name="state"
                htmlFor="adressState"
                required
                widthFull
                onChange={handleAdress}
                value={adressDataForm?.state}
              />
            </div>
            <div className="flex justify-center flex-wrap gap-4 flex-1">
              <Button
                primary
                text={editMode ? 'Editar' : 'Cadastrar'}
                widthFull={isMobile}
              />
            </div>
          </form>
        </Modal>
      )}
      {modalStatus === 'confirmationModal' && (
        <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
          <Heading text="Tem certeza?" small center />
          <div className="flex justify-center gap-6 mt-6">
            <Button
              secondary
              text="Sim"
              widthFull
              onClick={handleConfirmationModal}
            />
            <Button
              primary
              text="Não"
              widthFull
              onClick={() => setModalStatus(null)}
            />
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeliveryAdress
