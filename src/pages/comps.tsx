import { useState } from 'react'
import { MdLogin, MdAddShoppingCart, MdLockOutline } from 'react-icons/md'
import Button from '../components/Button'
import CrudCard from '../components/CrudCard'
import Input from '../components/Input'

interface FormData {
  name: string
  password: string
}

function Comps() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: ''
  })

  function handleClick() {
    alert('clicado')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
    console.log(formData)
  }

  return (
    <main className="m-4">
      <Button primary google text="Entre com o Google" onClick={handleClick} />
      <br /> <br />
      <Button secondary text="Entre com o Google" onClick={handleClick} />
      <br /> <br />
      <Button
        primary
        text="Adicionar ao carrinho"
        onClick={handleClick}
        icon={<MdAddShoppingCart />}
      />
      <br />
      <Button
        primary
        text={`Fazer Login`}
        onClick={handleClick}
        icon={<MdLogin />}
      />
      <br /> <br />
      <Input
        type="text"
        value={formData.name}
        onChange={handleChange}
        text="Nome:"
        placeholder="Nome..."
        name="name"
        validationMessage="Preencha um nome válido, por favor"
      />
      <br /> <br />
      <Input
        type="password"
        value={formData.password}
        onChange={handleChange}
        text="Senha:"
        icon={<MdLockOutline />}
        name="password"
      />
      <ul className="mt-8" style={{ width: 'calc(min(91.666667%,20rem))' }}>
        <CrudCard isActive>
          <p>Avenida Senador Feijó, 350</p>
          <p>Vila Mathias</p>
          <p>Santos/SP</p>
          <p>CEP: 11015-502</p>
        </CrudCard>
      </ul>
    </main>
  )
}

export default Comps
