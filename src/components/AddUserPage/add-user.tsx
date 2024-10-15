import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './add-user.css'; // Import your CSS file

const UserForm = () => {
  const initialValues = {
    username: '',
    email: '',
    imageUrl: '',
    role: 'user',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    imageUrl: Yup.string().url('Invalid URL format').required('Image URL is required'),
    role: Yup.string().oneOf(['user', 'admin'], 'Role is required').required('Role is required'),
  });

  const handleSubmit = (values:any) => {
    console.log('Form data:', values);
    // Handle form submission (e.g., API call)
  };

  return (
    <div className='user-form-data'>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="d-flex justify-content-between align-items-center "
    >
      {() => (
        <Form className="user-form ">
          <div className="user-form__group">
            <label className="user-form__label" htmlFor="username">Username</label>
            <Field className="user-form__input" name="username" type="text" />
            <ErrorMessage name="username" component="div" className="user-form__error" />
          </div>

          <div className="user-form__group">
            <label className="user-form__label" htmlFor="email">Email</label>
            <Field className="user-form__input" name="email" type="email" />
            <ErrorMessage name="email" component="div" className="user-form__error" />
          </div>

          <div className="user-form__group">
            <label className="user-form__label" htmlFor="imageUrl">Image URL</label>
            <Field className="user-form__input" name="imageUrl" type="text" />
            <ErrorMessage name="imageUrl" component="div" className="user-form__error" />
          </div>

          <div className="user-form__group">
            <label className="user-form__label" htmlFor="role">Role</label>
            <Field as="select" name="role" className="user-form__select">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Field>
            <ErrorMessage name="role" component="div" className="user-form__error" />
          </div>

          <button type="submit" className="user-form__button">Add User</button>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default UserForm;

