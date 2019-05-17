import React, {Component} from 'react'
import debounce from 'lodash.debounce'
import TextField from "./Components/TextField";
import SelectField from './Components/SelectField'
import NumberField from './Components/NumberField'
import {singleFieldValidation, allFieldsValidation} from "./Utils/Validator"

const waitTime = 700;

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      formFields: {
        name: '',
        cpf: '',
        birth_date: '',
        income_source: '',
        gender: '',
        income: '',
        uf: '',

        email: '',
        marital_status: '',
        id_number: '',
        id_issuer: '',
        zip_code: '',
        mobile_number: ''
      },
      formErrors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onDebounce = debounce(this.onDebounce.bind(this), waitTime)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }

  onChange(event){
    const {name, value} = event.target
    const formFields = {...this.state.formFields, [name] : value};
    this.setState({formFields});
    this.onDebounce({name, value})
  }

  onDebounce({name, value}) {
    const {formErrors} = this.state
    const {isValid, errors} = singleFieldValidation({key: name, value})
    if (!isValid) {
      this.setState({formErrors: {...formErrors, [name]: errors[name]}})
    } else {
      this.setState({formErrors: {...formErrors, [name]: null}})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {isValid, errors} = allFieldsValidation(this.state.formFields);
    if (!isValid) {
      this.setState({formErrors: errors})
      console.log({formErrors: errors})
    } else {
      alert('No error, form can now submit....')
      this.setState({formErrors: {}})
    }
  }

  render(){
    const {formFields, formErrors} = this.state;
    const {name, cpf, birth_date, income_source, income, gender, uf, mobile_number  } = formFields;

    return(
      <div className="vertical-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form className="col-md-8 col-xs-10 mx-auto" noValidate onSubmit={this.handleSubmit}>
              <TextField
                  error={formErrors['name']}
                  onChange={this.onChange}
                  value={name}
                  name="name"
                  placeholder="Digite seu nome completo"
                />

                <NumberField
                  error={formErrors['cpf']}
                  onChange={this.onChange}
                  value={cpf}
                  name="cpf"
                  placeholder="Digite o número do seu cpf"
                  format="###.###.###-##"
                />

                <NumberField
                  error={formErrors['birth_date']}
                  onChange={this.onChange}
                  value={birth_date}
                  name="birth_date"
                  placeholder="Digite a sua data de nascimento"
                  format="##/##/####"
                  mask={['D','D','M','M','A','A','A','A']}
                />

                <SelectField
                  error={formErrors['income_source']}
                  onChange={this.onChange}
                  value={income_source}
                  name="income_source"
                  placeholder="YYYY-MM-DD"
                >
                  <option disabled value='' >Selecione sua fonte de renda</option>
    
                  <option value='1'>CLT</option>
                  <option value='0'>Servidor público ou militar</option>
                  <option value='5'>Aposentado</option>
                  <option value='3'>MEI</option>
                  <option value='2'>Autônomo ou profissional informal</option>
                  <option value='4'>Empresário</option>
                </SelectField>

                <NumberField
                  error={formErrors['income']}
                  onChange={this.onChange}
                  value={income}
                  name="income"
                  placeholder="Digite quanto você ganha por mês"
                  thousandSeparator='.'
                  fixedDecimalScale
                  decimalScale={2}
                  prefix='R$ '
                />

                <SelectField
                  error={formErrors['gender']}
                  onChange={this.onChange}
                  value={gender}
                  name='gender's
                  >
                  <option disabled value='' >Selecione o seu gênero</option>
                  <option value={1}>Masculino</option>
                  <option value={2}>Feminino</option>
                </SelectField>

                <SelectField
                  error={formErrors['uf']}
                  onChange={this.onChange}
                  value={uf}
                  name='uf'
                  >
                  <option disabled value='' >Selecione o estado onde você reside</option>
                  <option value='AC'>Acre</option>
                  <option value='AL'>Alagoas</option>
                  <option value='AP'>Amapá</option>
                  <option value='AM'>Amazonas</option>
                  <option value='BA'>Bahia</option>
                  <option value='CE'>Ceará</option>
                  <option value='DF'>Distrito Federal</option>
                  <option value='ES'>Espírito Santo</option>
                  <option value='GO'>Goiás</option>
                  <option value='MA'>Maranhão</option>
                  <option value='MT'>Mato Grosso</option>
                  <option value='MS'>Mato Grosso do Sul</option>
                  <option value='MG'>Minas Gerais</option>
                  <option value='PA'>Pará</option>
                  <option value='PB'>Paraíba</option>
                  <option value='PR'>Paraná</option>
                  <option value='PE'>Pernambuco</option>
                  <option value='PI'>Piauí</option>
                  <option value='RJ'>Rio de Janeiro</option>
                  <option value='RN'>Rio Grande do Norte</option>
                  <option value='RS'>Rio Grande do Sul</option>
                  <option value='RO'>Rondônia</option>
                  <option value='RR'>Roraima</option>
                  <option value='SC'>Santa Catarina</option>
                  <option value='SP'>São Paulo</option>
                  <option value='SE'>Sergipe</option>
                  <option value='TO'>Tocantins</option>
                </SelectField>


                <NumberField
                  error={formErrors['mobile_number']}
                  onChange={this.onChange}
                  value={mobile_number}
                  name="mobile_number"
                  placeholder="Digite o número do seu celular"
                  format="(##) #####-####"
                />

                {this.state.formFields.mobile_number}

                <button className="btn btn-primary" type="submit">Submit form</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App