import css from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  return (
    <header className={css.searchBarBackground}>
      <div>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => {
            if (!values.search.trim()) {
              toast.error("Search field cannot be empty!", {
                duration: 4000,
                position: "top-left",
              });
            } else {
              onSubmit(values);
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form className={css.searchBox} onSubmit={handleSubmit}>
              <button
                type="submit"
                name="submitQuery"
                className={css.submitButton}
              >
                &#128270;
              </button>
              <Field
                autoFocus
                type="text"
                autoComplete="off"
                name="search"
                placeholder="Search images and photos"
                className={css.searchInput}
              />
            </Form>
          )}
        </Formik>
      </div>
    </header>
  );
};

export default SearchBar;
