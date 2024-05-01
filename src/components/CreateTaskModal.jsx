import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateTaskModal = ({
  showCreateModal,
  handleCreateModalClose,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleCreateTask = async () => {
    await axios
      .post(
        "https://task-management-server-uuom.onrender.com/api/v1/task/post",
        { title, description,dueDate,dueTime},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prevTasks) => [...prevTasks, res.data.task]);
        setTitle("");
        setDescription("");
        setdueDate("");
        setDueTime("");
        handleCreateModalClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });


  };

  return (
    <>
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setdueDate(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Due Time</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCreateModalClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleCreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
  );
};

export default CreateTaskModal;
