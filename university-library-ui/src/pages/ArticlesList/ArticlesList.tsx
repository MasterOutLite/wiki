import React, {FocusEvent, memo, useCallback, useEffect, useState} from 'react';

import Layout from 'src/components/Layout';
import postStore from "../../zustand_store/postStore";
import styles from './ArticlesList.module.scss';
import CircularProgress from "@mui/material/CircularProgress";
import Post from "./Post/Post";
import {Box, Button, Modal, Paper, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import authStore from "../../zustand_store/authStore";
import TextField from "@mui/material/TextField";
import {createPost} from "../../api/apiRequest";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ArticlesList() {
  const navigate = useNavigate();
  const posts = postStore(state => state.postIds);
  const getAllPosts = postStore(state => state.getAllPost);
  const user = authStore(state => state.user);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleNameChange = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setName(value);
  }, []);

  const handleDescriptionChange = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setDescription(value);
  }, []);

  const handleCreatePost = useCallback(() => {
    if (name.length < 4 || description.length < 6 || !user)
      return;

    createPost({name, description}).then(r => {
      console.log(r);
      if (r.status !== 201)
        return;
      setName('');
      setDescription('');
      handleClose();
    });
  }, [name, description, user]);


  const goToPostById = useCallback((postId: number) => {
    navigate(`/articles/${postId}`);
  }, [navigate]);


  useEffect(() => {
    getAllPosts().then();
  });

  if (!posts) {
    return (
      <Layout name="Articles" className={styles.root}>
        <CircularProgress color="secondary"/>
      </Layout>
    );
  }

  return (
    <Layout name="Articles" className={styles.root}>
      {user ?
        <div className={styles.nav}>
          <Button onClick={handleOpen}>Додати пост</Button>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style} className={styles.modal}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
               Заповніть поля даними
              </Typography>
              <TextField
                label="Назва посту"
                variant="outlined"
                placeholder="Введіть назву поста"
                fullWidth
                type="email"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                label="Про що пост"
                variant="outlined"
                placeholder="Введіть про що буде ваш пост"
                multiline
                fullWidth
                type="email"
                value={description}
                onChange={handleDescriptionChange}
                minRows={4}
              />
              <Button onClick={handleCreatePost}>Створити пост</Button>
            </Box>
          </Modal>
        </div>
        : null}

      <Stack spacing={2} className={styles.postsContainer}>
        {
          posts.map(post => (
            <Paper key={post} style={{padding: '10px'}} elevation={3}
                   onClick={() => {
                     goToPostById(post);
                   }}>
              <Post postId={post}/>
            </Paper>
          ))
        }
      </Stack>

    </Layout>
  );
}

export default memo(ArticlesList);
