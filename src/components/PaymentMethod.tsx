import { useUserContext, PaymentMethod } from '../contexts/UserContext'
import CrudCard from '../components/CrudCard'
import { AnimationPayment } from './Lottie'
import Button from './Button'
import { useGlobalContext } from '../contexts/GlobalContext'
import { FormEvent, useCallback } from 'react'
import Modal from './Modal'
import Heading from './Heading'
import { MdLockOutline } from 'react-icons/md'
import Input from './Input'

interface PaymentMethodProps {
  orientation: 'horizontal' | 'vertical'
}

const PaymentMethod = ({ orientation }: PaymentMethodProps) => {
  const { isMobile, editMode, setEditMode, modalStatus, setModalStatus } =
    useGlobalContext()

  const {
    currentUser,
    paymentMethodDataForm,
    setPaymentMethodDataForm,
    setActivePaymentMethod,
    deletePaymentMethod,
    setPaymentMethod,
    updatePaymentMethod
  } = useUserContext()

  const handlePaymentMethod = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      setPaymentMethodDataForm({
        ...paymentMethodDataForm,
        [e.currentTarget.name]: e.currentTarget.value
      })
    },
    [paymentMethodDataForm]
  )

  const handleCreatePaymentMethod = () => {
    setPaymentMethod()
    setModalStatus(null)
  }

  const handleDeletePaymentMethod = () => {
    setModalStatus('confirmationModal')
  }

  const handleEditPaymentMethod = (arg: number) => {
    setEditMode(true)
    if (currentUser?.paymentMethodList)
      setPaymentMethodDataForm(currentUser?.paymentMethodList?.[arg])
    setModalStatus('createPaymentMethodModal')
  }

  const handleUpdatePaymentMethod = () => {
    if (typeof currentUser?.selectedPaymentMethod === 'number') {
      updatePaymentMethod(currentUser.selectedPaymentMethod)
    }
    setModalStatus(null)
  }

  const handleSubmitPaymentMethod = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editMode ? handleUpdatePaymentMethod() : handleCreatePaymentMethod()
  }

  const handleConfirmationModal = () => {
    if (typeof currentUser?.selectedPaymentMethod === 'number') {
      deletePaymentMethod(currentUser.selectedPaymentMethod)
      setModalStatus(null)
    }
  }

  return (
    <>
      {currentUser?.paymentMethodList?.length ? (
        <ul
          className={`
            flex gap-6
              ${orientation === 'vertical' && 'flex-col items-end'}
              ${orientation === 'horizontal' && 'flex-row my-6 justify-center'}
              ${isMobile && 'flex-col items-center'}
          `}
        >
          {currentUser?.paymentMethodList?.map(({ alias, cardNumber }, idx) => {
            return (
              <CrudCard
                key={idx}
                isActive={idx === currentUser.selectedPaymentMethod}
                onClick={() => setActivePaymentMethod(idx)}
                handleDeleteButton={handleDeletePaymentMethod}
                handleUpdateButton={() => handleEditPaymentMethod(idx)}
              >
                <p>{alias}</p>
                <p>••••{cardNumber?.slice(-4)}</p>
              </CrudCard>
            )
          })}
        </ul>
      ) : (
        <div className="flex justify-center items-center flex-col gap-4">
          <AnimationPayment />
          <p className="text-primary text-center">
            Nenhum meio de pagamento cadastrado.
          </p>
        </div>
      )}
      <div
        className={`flex ${
          currentUser?.paymentMethodList?.length
            ? 'flex-row-reverse'
            : 'justify-center'
        }`}
      ></div>

      <div
        className={`
          flex my-6
          ${
            currentUser?.paymentMethodList?.length
              ? 'justify-end'
              : 'justify-center'
          }
          ${orientation === 'horizontal' && 'justify-center lg:mr-6'}
        `}
      >
        <Button
          primary
          text="Cadastrar novo"
          onClick={() => {
            setEditMode(false)
            setPaymentMethodDataForm({} as PaymentMethod)
            setModalStatus('createPaymentMethodModal')
          }}
        />
      </div>
      {modalStatus === 'createPaymentMethodModal' && (
        <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
          <form
            onSubmit={(e) => handleSubmitPaymentMethod(e)}
            className="m-auto flex flex-col gap-6 w-full md:w-80"
          >
            <Heading
              text={editMode ? 'Editar cartão' : 'Novo cartão'}
              small
              center
            />

            <Input
              text="Apelido do cartão:"
              name="alias"
              htmlFor="paymentMethodAlias"
              required
              widthFull
              placeholder="Banco X"
              onChange={handlePaymentMethod}
              value={paymentMethodDataForm?.alias}
            />
            <Input
              text="Número do cartão:"
              name="cardNumber"
              htmlFor="paymentMethodCardNumber"
              required
              widthFull
              icon={<MdLockOutline />}
              onChange={handlePaymentMethod}
              value={paymentMethodDataForm?.cardNumber}
            />
            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: '6fr 6fr' }}
            >
              <Input
                text="Validade:"
                maxLength={5}
                name="expirationDate"
                htmlFor="paymentMethodExpirationDate"
                required
                widthFull
                placeholder="00/00"
                onChange={handlePaymentMethod}
                value={paymentMethodDataForm?.expirationDate}
              />
              <Input
                text="CVV:"
                maxLength={3}
                name="securityCode"
                htmlFor="paymentMethodSecurityCode"
                required
                widthFull
                icon={<MdLockOutline />}
                onChange={handlePaymentMethod}
                value={paymentMethodDataForm?.securityCode}
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

export default PaymentMethod
