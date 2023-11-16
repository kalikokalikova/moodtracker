import React, { useState } from "react";
import GridSquare from "./GridSquare";
import { createUseStyles } from "react-jss";
import GridData from "./GridData";
import { Button, useDisclosure } from "@chakra-ui/react";
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
    display: 'grid',  // Set display property to 'grid'
    gridTemplateColumns: 'repeat(6, 1fr)', // You can adjust the number of columns as needed
    gap: '8px', // Adjust the gap between squares
  },
});

function Grid() {
  const [ moodpointForm, setMoodpointForm ] = useState({
    "energy": 0,
    "pleasantness": 0,
    "label": "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const style = styles();

  const handleGridSquareClick = (energy, pleasantness, label) => {
    setMoodpointForm({energy: energy, pleasantness: pleasantness, label: label})
    onOpen();
  };

  const submitMoodpointForm = async () => {
    console.log("submit the form", moodpointForm)
    try {
      let response = await api.post("/moodpoints/", moodpointForm);
      setMoodpointForm({
        energy: 0,
        pleasantness: 0,
        label: ""
      });
      console.log("Here's the response: ", response)
    } catch (error) {
      console.log("There was an error saving this data point and here it is ", error)
    }
    onClose();
  };

  return (
    <>
      <div className={style.squareContainer}>
        {GridData.map((data, index) => (
          <div key={index}><GridSquare data={data} handleGridSquareClick={handleGridSquareClick}/></div>
        ))}
      </div>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Save MoodPoint
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you want to save this MoodPoint?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={submitMoodpointForm} ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Grid;
