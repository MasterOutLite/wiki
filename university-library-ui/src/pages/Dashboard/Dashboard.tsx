import React, {memo, useEffect, useState} from 'react';

import Layout from 'src/components/Layout';
import styles from './Dashboard.module.scss';
import authStore from "../../zustand_store/authStore";
import {Box, LinearProgress, LinearProgressProps, Paper, Typography} from "@mui/material";
import postStore from "../../zustand_store/postStore";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Chart, Doughnut, Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', width: "100%", padding: '10px'}}>
      <Box sx={{width: '100%', mr: 1}}>
        <LinearProgress style={{width: '600px', height: '20px'}}
                        variant="determinate" {...props} />
      </Box>
      <Box sx={{minWidth: 35}}>
        <Typography style={{fontSize: '1rem'}} variant="body2" color="text.secondary">{`${Math.round(
          // eslint-disable-next-line react/destructuring-assignment
          props.value,
        )}%/100%`}</Typography>
      </Box>
    </Box>
  );
}

function Dashboard() {
  const user = authStore(state => state.user);
  const getAllPost = postStore(state => state.getAllPost);
  const [countPost, setCountPost] = useState<number>(0);
  const [countAllPost, setCountAllPost] = useState<number>(0);

  const data = {
    labels: ['Загальна', 'Користувача'],
    datasets: [
      {
        label: 'Кількість',
        data: [12, 19,],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    async function getCountUserPost() {
      const posts = await getAllPost();
      if (posts && user) {
        const userPost = posts.filter(post => post.userId === user?.id);
        setCountPost(userPost.length);
        setCountAllPost(posts.length);
        console.log('posts all: ' + posts.length + " . user post: " + userPost.length);
      }
    }

    getCountUserPost().then();
  }, [user, getAllPost]);

  return (
    <Layout name="Dashboard" className={styles.root}>
      <div className={styles.userInfoWrap}>
        {user ?
          <>
            <div className={styles.userInfo}>
              <Paper style={{padding: '20px'}}>
                <div>Email: {user?.email}</div>
                <div>Користувач: {user?.firstName} {user?.lastName}</div>
                <div>Роль: {user.userRoleId === 1 ? 'Адміністратор' : 'Користувач'}</div>
              </Paper>
            </div>
            {/*<LinearProgressWithLabel value={(countPost / countAllPost) * 100}/>*/}
            <Paper style={{padding: '20px'}}>
              Кількість постів користувача: {countPost}
            </Paper>
          </>
          :
          <Paper style={{padding: '20px'}}>

            <div> Користувач не авторизований</div>
          </Paper>
        }
        <Paper style={{padding: '20px'}}>
          Загальна кількість постів: {countAllPost}
        </Paper>
        <Paper style={{padding: '20px'}}>
          {user ?
            <Doughnut data={{
              labels: ['Всього постів', 'Користувача постів'],
              datasets: [
                {
                  label: 'Кількість',
                  data: [countAllPost, countPost,],
                  backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}/>
            : null
          }
        </Paper>
      </div>


    </Layout>
  );
}

export default memo(Dashboard);
