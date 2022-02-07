import { useState } from 'react'

export default function useForm({ initialValues, validation, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = c => {
    const { name, value, type } = c.target
    if (type === 'checkbox') {
      setValues({ ...values, rememberMe: !values.rememberMe })
    } else {
      setValues({ ...values, [name]: value })
    }
  }

  const handleSubmit = () => {
    const e = validation(values)
    setErrors(e)

    if (e.account || e.password) return

    onSubmit(values)
  }

  return { handleChange, handleSubmit, values, errors }
}
