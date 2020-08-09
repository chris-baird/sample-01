import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import API from "../utils/API";
import _ from "lodash";
import { library } from "@fortawesome/fontawesome-svg-core";
import ShortTermGoalForm from "../components/ShortTermGoalForm";

export const Goals = () => {
  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
    shortTermGoals: [],
  });

  // Auth0 helper functions
  const {
    user: { sub },
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
  } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      API.getAllSortTermGoals(sub, token)
        .then((response) => {
          const shortTermGoals = _.pick(response, ["data"]).data;
          console.log(shortTermGoals);
          setState({ ...state, shortTermGoals });
        })
        .catch((err) => console.log(err))
    );
    // console.log(API.getAllSortTermGoals(sub, getAccessTokenSilently()));
  }, []);

  // State and function to update state for short term modal
  const [shortTermModal, setShortTermModal] = useState(false);
  // Toggles the short term model
  const toggleShortTermModal = () => setShortTermModal(!shortTermModal);

  // State and function to update state for short term modal
  const [longTermModal, setLongTermModal] = useState(false);
  // Toggles the short term model
  const toggleLongTermModal = () => setLongTermModal(!longTermModal);

  // Login function for error consent
  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  // Login function for error redirects
  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }

    await callApi();
  };

  // Example of how to call backend api
  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`/api/external`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  // Prevents default and then invoks provided callback function
  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  return (
    <Container>
      <div className="mb-5">
        {/* Prompts user for consent if state error consent required */}
        {state.error === "consent_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}
        {/* Alerts and props user to log in if state error login required */}
        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )}
        <Row>
          <Col xs="12" sm="12" md="6" lg="6" xl="6">
            <h1>Goals</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              porttitor massa dolor, eget pulvinar diam euismod a. Donec vel
              tempor risus. Curabitur eleifend est gravida neque ullamcorper
              auctor. Pellentesque fermentum tincidunt nibh consequat maximus.
              Suspendisse a nisi id neque dictum gravida eu blandit tellus.
              Aliquam id mi vitae urna luctus malesuada sit amet ut elit. Morbi
              laoreet molestie eros, ac eleifend enim scelerisque in.
              Suspendisse vitae ipsum metus.
            </p>
            {/* Create short term goal button */}
            <Button
              color="primary"
              className="mt-5"
              onClick={toggleShortTermModal}
            >
              Create Short Term Goal
            </Button>
            {/* Short term goal shortTermModal */}
            <Modal
              isOpen={shortTermModal}
              toggle={toggleShortTermModal}
              centered={true}
            >
              <ModalHeader toggle={toggleShortTermModal}>
                Create A Short Term Goal
              </ModalHeader>
              <ModalBody>
                <ShortTermGoalForm />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
            <Button
              color="primary"
              className="mt-5"
              onClick={toggleLongTermModal}
            >
              Create Long Term Goal
            </Button>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6" xl="6">
            <h2>Your Goals</h2>
            {state.shortTermGoals.map((shortTermGoal) => (
              <li key={shortTermGoal._id}>{shortTermGoal.goal}</li>
            ))}
          </Col>
        </Row>
        {/* long term goal shortTermModal */}
        <Modal
          isOpen={longTermModal}
          toggle={toggleLongTermModal}
          centered={true}
        >
          <ModalHeader toggle={toggleLongTermModal}>
            Create A Long Term Goal
          </ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleLongTermModal}>
              Create
            </Button>{" "}
            <Button color="secondary" onClick={toggleLongTermModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Container>
  );
};

export default withAuthenticationRequired(Goals, {
  onRedirecting: () => <Loading />,
});
