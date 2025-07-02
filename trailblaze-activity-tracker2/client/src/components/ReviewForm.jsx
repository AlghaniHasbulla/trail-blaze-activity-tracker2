import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReviewSchema = Yup.object().shape({
  rating: Yup.number().min(1).max(5).required("Rating is required"),
  comment: Yup.string().required("Comment is required"),
  user_id: Yup.string().required("User ID is required"),
  location_id: Yup.string().required("Location ID is required")
});

function ReviewForm({ match }) {
  const locationId = match?.params?.id;

  return (
    <Formik
      initialValues={{ rating: '', comment: '', user_id: '', location_id: locationId }}
      validationSchema={ReviewSchema}
      onSubmit={(values) => {
        fetch('/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(() => alert("Review submitted!"));
      }}
    >
      {() => (
        <Form className="space-y-4 max-w-md mx-auto">
          <div>
            <label className="block font-medium">Rating (1–5)</label>
            <Field type="number" name="rating" min="1" max="5" className="w-full border px-3 py-2" />
            <ErrorMessage name="rating" component="div" className="text-red-500" />
          </div>

          <div>
            <label className="block font-medium">Comment</label>
            <Field as="textarea" name="comment" className="w-full border px-3 py-2" />
            <ErrorMessage name="comment" component="div" className="text-red-500" />
          </div>

          <Field type="hidden" name="location_id" />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Review
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;