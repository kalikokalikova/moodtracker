import React, { useState, useContext } from "react";
import GridSquare from "./GridSquare";
import { UserContext } from "../../Hooks/UserContext";
import { createUseStyles } from "react-jss";
import GridData from "./GridData";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import api from "../../api";

const styles = createUseStyles({
  squareContainer: {
    display: "grid", // Set display property to 'grid'
    gridTemplateColumns: "repeat(6, 1fr)", // You can adjust the number of columns as needed
    gap: "8px", // Adjust the gap between squares
  },
});

function Grid() {
  const { user } = useContext(UserContext);
  const [moodpointForm, setMoodpointForm] = useState({
    energy: 0,
    pleasantness: 0,
    label: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const style = styles();
  const toast = useToast();

  const handleGridSquareClick = (energy, pleasantness, label) => {
    setMoodpointForm({
      energy: energy,
      pleasantness: pleasantness,
      label: label,
      user_id: user?.user_id,
    });
    onOpen();
  };

  const submitMoodpointForm = async () => {
    console.log("submit the form", moodpointForm);
    try {
      let response = await api.post("/moodpoints/", moodpointForm);
      setMoodpointForm({
        energy: 0,
        pleasantness: 0,
        label: "",
      });
      console.log("Here's the response: ", response);
      toast({
        title: "The MoodPoint has been saved!",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(
        "There was an error saving this data point and here it is ",
        error
      );
      toast({
        title: "Something has gone wrong, please try again later",
        status: "error",
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <>
      <div className={style.squareContainer}>
        {GridData.map((data, index) => (
          <div key={index}>
            <GridSquare
              data={data}
              handleGridSquareClick={handleGridSquareClick}
            />
          </div>
        ))}
      </div>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay>
          {user ? (
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Do you want to save this Mood Point?
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  NM
                </Button>

                <Button
                  colorScheme="green"
                  onClick={submitMoodpointForm}
                  ml={3}
                >
                  Yes!
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          ) : (
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                You need to sign in or create an account to save this Mood Point.
              </AlertDialogHeader>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  OK
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Grid;
