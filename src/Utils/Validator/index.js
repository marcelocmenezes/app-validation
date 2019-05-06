import Validator from './customValidations'

const rules = {
  name: 'required|min:3|max:30|blankspace|fullname',
  email: 'required|email',
  gender: 'required',
  cpf: 'required|cpf',
  birth_date: 'required|adulthood',
  income_source: 'required',
  income: 'required',
  uf: 'required'
};

const messages = {
  required: ':attribute é um campo obrigatório.',
  max: 'O campo :attribute aceita o máximo de :max caracteres.',
  min: 'O campo :attribute aceita o mínimo de :min caracteres.'
}

const attributesNames = {
  name: 'Nome Completo',
  cpf: 'CPF',
  birth_date: 'Data de Nascimento',
  income: 'Renda Mensal',
  income_source: 'Fonte de Renda',
  marital_status: 'Estado Civil',
  gender: 'Gênero',
  uf: 'Estado de Residência'
}


export const singleFieldValidation = ({key, value}) => {
  const validationResponse = {isValid: true};
  if (rules[key]) {
    const validation = new Validator({[key]: value}, {[key]: rules[key]}, messages);
    validation.setAttributeNames(attributesNames)
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

export const allFieldsValidation = (data) => {
  const validation = new Validator(data, rules, messages);
  validation.setAttributeNames(attributesNames)
  const validationResponse = {isValid: validation.passes()};
  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }
  return validationResponse;
};


