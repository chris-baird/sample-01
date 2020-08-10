import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import API from "../utils/API";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
const ShortTermGoalForm = (props) => {
  const {
    user: { sub },
    getAccessTokenSilently,
  } = useAuth0();
  return (
    <Formik
      initialValues={{ goal: "", description: "" }}
      validationSchema={Yup.object({
        goal: Yup.string()
          .min(1, "Must be at least 1 character.")
          .max(30, "Must be less that 30 characters.")
          .required("Goal title is required."),
        description: Yup.string()
          .min(1, "Must be at least 1 character.")
          .max(100, "Must be less that 30 characters.")
          .required("Goal description is required."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const newShortTermGoal = _.pick(values, ["goal", "description"]);
        getAccessTokenSilently().then((token) => {
          API.createShortTermGoal(sub, newShortTermGoal, token).then(
            (response) => {
              console.log(response);
              const newShortTermGoal = _.pick(response, ["data"]).data;
              console.log(newShortTermGoal);
              setSubmitting(false);
              props.handleUpdateShortTermGoals(newShortTermGoal);
            }
          );
        });
      }}
    >
      {({
        values,

        errors,

        touched,

        handleChange,

        handleBlur,

        handleSubmit,

        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="goal">Goal Title</Label>
            <Input
              type="text"
              name="goal"
              id="goal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.goal}
              placeholder="Drink less soda"
            />
            {errors.goal && touched.goal && errors.goal}
          </FormGroup>

          <FormGroup>
            <Label for="description">Goal Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {errors.description && touched.description && errors.description}
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ShortTermGoalForm;
