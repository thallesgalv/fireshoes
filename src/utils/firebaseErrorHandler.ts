export const firebaseErrorHandler = (codeError: string) => {
  switch (codeError) {
    case 'auth/missing-email':
      return 'Por favor, digite suas credenciais.'
    case 'auth/invalid-email':
      return 'E-mail inválido.'
    case 'auth/user-not-found':
      return 'Usuário não encontrado.'
    case 'auth/admin-restricted-operation':
      return 'Por favor, preencha o formulário.'
    case 'auth/email-already-in-use':
      return 'O e-mail escolhido já possui uma conta associada.'
    case 'auth/weak-password':
      return 'Escolha uma senha com seis ou mais caracteres.'
    default:
      return 'Erro desconhecido. Tente novamente.'
  }
}

//auth/weak-password
