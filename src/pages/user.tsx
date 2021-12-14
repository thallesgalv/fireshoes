import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useCallback, useState, useEffect } from 'react'
import Button from '../components/Button'
import Heading from '../components/Heading'
import { MdLogout, MdNoAccounts } from 'react-icons/md'
import { useAuthContext } from '../contexts/AuthContext'
import Input from '../components/Input'
import CrudCard from '../components/CrudCard'
import UserOption from '../components/UserOption'
import Modal, { ModalStatus } from '../components/Modal'
import { useGlobalContext } from '../contexts/GlobalContext'
import { useUserContext } from '../contexts/UserContext'
import { MdLockOutline } from 'react-icons/md'
import useFetch from '../hooks/useFetch'

const User: NextPage = () => {
  const { logout } = useAuthContext()
  const { isMobile } = useGlobalContext()
  const { currentUser, setCurrentUser, setAdress, getUser, setActiveAdress } =
    useUserContext()
  const { request, data } = useFetch()

  const [radio, setRadio] = useState('entrega')
  const [modalStatus, setModalStatus] = useState<ModalStatus>(null)

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    let postalCode = currentUser?.adress?.postalCode

    if (postalCode) postalCode = postalCode.replace(/\D/g, '')

    if (postalCode?.length === 8) {
      request(`https://viacep.com.br/ws/${postalCode}/json/`)
      setCurrentUser({
        ...currentUser,
        adress: {
          ...currentUser?.adress,
          street: data?.logradouro,
          neighborhood: data?.bairro,
          city: data?.localidade,
          state: data?.uf
        }
      })
    }
  }, [currentUser?.adress?.postalCode])

  const handleAdress = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setCurrentUser({
        ...currentUser,
        adress: {
          ...currentUser?.adress,
          [e.currentTarget.name]: e.currentTarget.value
        }
      })
    },
    [currentUser]
  )

  const handlePaymentMethod = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setCurrentUser({
        ...currentUser,
        paymentMethod: {
          ...currentUser?.paymentMethod,
          [e.currentTarget.name]: e.currentTarget.value
        }
      })
    },
    [currentUser]
  )

  const handleClick = (arg: number) => {
    setCurrentUser({...currentUser, selectedAdress: +arg})
    setActiveAdress(+arg)
  }

  return (
    <>
      <Head>
        <title>Fireshoes 🔥 | Área do Usuário</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading text="Área do Usuário" center />
      <section
        className="
          w-11/12 m-auto
          lg:w-full lg:flex
        "
      >
        <aside className="flex flex-col gap-6">
          <UserOption
            radio={radio}
            setRadio={setRadio}
            text="Endereço de entrega"
            value="entrega"
          />
          <UserOption
            radio={radio}
            setRadio={setRadio}
            text="Meios de pagamento"
            value="pagamento"
          />
          <UserOption
            radio={radio}
            setRadio={setRadio}
            text="Compras realizadas"
            value="compras"
          />
          <div>
            <Button
              primary
              text="Fazer logout"
              icon={<MdLogout />}
              onClick={logout}
            />
          </div>
          <div>
            <Button
              secondary
              text="Deletar conta"
              icon={<MdNoAccounts />}
              onClick={logout}
            />
          </div>
        </aside>
        <article
          className="lg:absolute left-0 right-0 mt-6 lg:m-auto "
          style={{ width: 'calc(min(91.666667%,25rem))' }}
        >
          <div>
            {radio === 'entrega' && (
              <ul className="flex flex-col gap-6">
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
                        onClick={() => handleClick(idx)}
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
                <div className="flex flex-row-reverse">
                  <Button
                    primary
                    text="Cadastrar novo"
                    onClick={() => {
                      setModalStatus('createAdressModal')
                    }}
                  />
                </div>
              </ul>
            )}
          </div>
          <div>
            {radio === 'pagamento' && (
              <ul className="flex flex-col gap-6">
                <CrudCard isActive>
                  <p>Crédito Nubank Mãe</p>
                  <p>••••0099</p>
                </CrudCard>
                <CrudCard>
                  <p>Crédito Nubank Mãe</p>
                  <p>••••0099</p>
                </CrudCard>
                <div className="flex flex-row-reverse">
                  <Button
                    primary
                    text="Cadastrar novo"
                    onClick={() => {
                      setModalStatus('createPaymentMethodModal')
                    }}
                  />
                </div>
              </ul>
            )}
          </div>

          <div>
            {radio === 'compras' && (
              <ul>
                <p className="text-center">Compras realizadas</p>
              </ul>
            )}
          </div>
        </article>
      </section>

      {modalStatus === 'createAdressModal' && (
        <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="m-auto flex flex-col gap-6"
            style={{ width: 'calc(min(91.666667%, 20rem))' }}
          >
            <Heading text="Novo endereço" small center />
            <Input
              text="CEP:"
              type="text"
              name="postalCode"
              htmlFor="adressPostalCode"
              required
              widthFull
              placeholder="00000-000"
              onChange={handleAdress}
              mask="postalCodeMask"
              value={currentUser?.adress?.postalCode}
            />
            <Input
              text="Logradouro:"
              type="text"
              name="street"
              htmlFor="adressStreet"
              required
              widthFull
              onChange={handleAdress}
              value={currentUser?.adress?.street}
            />

            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 2fr 8fr'
              }}
            >
              <Input
                text="Número:"
                type="text"
                name="number"
                htmlFor="adressNumber"
                required
                widthFull
                onChange={handleAdress}
                value={currentUser?.adress?.number}
              />
              <Input
                text="Complemento:"
                type="text"
                name="complement"
                htmlFor="adressComplement"
                widthFull
                onChange={handleAdress}
                value={currentUser?.adress?.complement}
              />
              <div className="col-span-2 lg:col-auto flex items-center">
                <Input
                  text="Bairro:"
                  type="text"
                  name="neighborhood"
                  htmlFor="adressNeighborhood"
                  required
                  widthFull
                  onChange={handleAdress}
                  value={currentUser?.adress?.neighborhood}
                />
              </div>
            </div>
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: '10fr 2fr' }}
            >
              <Input
                text="Cidade:"
                type="text"
                name="city"
                htmlFor="adressCity"
                required
                widthFull
                onChange={handleAdress}
                value={currentUser?.adress?.city}
              />
              <Input
                text="UF:"
                type="text"
                name="state"
                htmlFor="adressState"
                required
                widthFull
                onChange={handleAdress}
                value={currentUser?.adress?.state}
              />
            </div>

            <div className="flex justify-center flex-wrap gap-4 flex-1">
              <Button
                primary
                text="Cadastrar"
                widthFull={isMobile}
                onClick={() => {
                  setAdress()
                  setModalStatus(null)
                }}
              />
            </div>
          </form>
        </Modal>
      )}
      {modalStatus === 'createPaymentMethodModal' && (
        <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="m-auto flex flex-col gap-6"
            style={{ width: 'calc(min(91.666667%, 20rem))' }}
          >
            <Heading text="Novo Cartão" small center />
            <Input
              text="Apelido do cartão:"
              type="text"
              name="alias"
              htmlFor="paymentMethodAlias"
              required
              widthFull
              placeholder="Banco X"
              onChange={handlePaymentMethod}
            />
            <Input
              text="Número do cartão:"
              type="text"
              name="cardNumber"
              htmlFor="paymentMethodCardNumber"
              required
              widthFull
              icon={<MdLockOutline />}
              onChange={handlePaymentMethod}
            />
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: '6fr 6fr' }}
            >
              <Input
                text="Validade:"
                type="text"
                name="expirationDate"
                htmlFor="paymentMethodExpirationDate"
                required
                widthFull
                placeholder="00/00"
                onChange={handlePaymentMethod}
              />
              <Input
                text="CVV:"
                type="text"
                name="securityCode"
                htmlFor="paymentMethodSecurityCode"
                required
                widthFull
                icon={<MdLockOutline />}
                onChange={handlePaymentMethod}
              />
            </div>

            <div className="flex justify-center flex-wrap gap-4 flex-1">
              <Button primary text="Cadastrar" widthFull={isMobile} />
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default User
