import Validator from 'validatorjs'
import CPF from 'gerador-validador-cpf'

const cpf = (value) => (CPF.validate(value))
const blankspace = (value) => (/^[a-zA-Z0-9]+|\\s+$/.test(value))
const fullname = (value) => (/.+\s.+/.test(value))
const adulthood = (value) => (new Date(parseInt(value.split('/')[2], 10) + 18, parseInt(value.split('/')[1], 10) - 1, parseInt(value.split('/')[0], 10)) <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))

Validator.register('cpf', cpf, 'CPF inválido.')
Validator.register('blankspace', blankspace, 'O campo :attribute não pode começar com espaços em branco.')
Validator.register('fullname', fullname, 'O campo :attribute precisa conter nome e sobrenome.')
Validator.register('adulthood', adulthood, 'Você precisa ser maior de 18 anos.')

export default Validator