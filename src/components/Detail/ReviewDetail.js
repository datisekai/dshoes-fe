import axios from "axios";
import React, { useEffect, useState } from "react";
import { Coin } from "react-cssfx-loading/lib";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { base_comments } from "../../api/config";
import { calculateCreatedTime } from "../../utils/changeTime";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";

const ReviewDetail = () => {
  const userInfo = useSelector((state) => state.user);
  const { id } = useParams();
  const [comments, setComments] = useState();
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getReview();
  }, [id]);

  const getReview = async () => {
    try {
      const res = await axios.get(`${base_comments}/${id}`);
      setComments(res.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${base_comments}?userId=${userInfo?.user?.userInfo?._id}&productId=${id}`,
        { content }
      );
      if (res.data.success) {
        setContent("");
        setComments([...comments, res.data.comment]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoad(true);
        axios
          .delete(`${base_comments}/${id}`)
          .then((res) => {
            if (res.data.success) {
              setComments(comments.filter((item) => item._id !== id));
              toast.success("Delete comments successfull !");
            }
            setLoad(false);
          })
          .catch((err) => {
            console.log(err);
            setLoad(false);
          });
      }
    });
  };

  return (
    <div className='mt-3'>
      <h2 className='text-gray-100'>Reviewed</h2>
      {userInfo && userInfo.user && userInfo.user.roles.includes(3) && (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name=''
            id=''
            value={content}
            required
            minLength={1}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Enter your review...'
            className='tw-px-5 tw-py-1 tw-rounded-md tw-border-0 tw-w-full tw-text-[#ccc] tw-border-b tw-border-[#007BFF] tw-bg-transparent tw-mt-2 tw-outline-none'
            autoComplete='off'
          />
        </form>
      )}
      {userInfo && !userInfo.user && (
        <p className='tw-text-gray-100 tw-text-center tw-mt-2'>
          You must be{" "}
          <span
            onClick={() => navigate(`/login?productId=${id}`)}
            className='tw-text-red-400 tw-underline tw-cursor-pointer hover:tw-text-red-700 tw-transition-all'
          >
            logged in
          </span>{" "}
          to comment
        </p>
      )}
      {userInfo && userInfo.user && !userInfo.user.roles.includes(3) && (
        <p className='tw-text-red-400  tw-text-center tw-mt-2'>
          You do not have the right to comment
        </p>
      )}
      <div className='tw-mt-6'>
        {comments &&
          comments.map((item, index) => (
            <div
              key={index}
              className='tw-mt-3 tw-flex tw-items-center tw-justify-between'
            >
              <div>
                <h6 className='tw-text-gray-100 tw-text-md tw-underline'>
                  {item?.userId?.email}
                </h6>
                <p className='tw-text-sm tw-text-[#ccc]'>
                  {calculateCreatedTime(item?.createdAt)}
                </p>
                <p className='tw-text-[#ccc] tw-text-sm tw-py-2'>
                  {item.content}
                </p>
              </div>
              {userInfo && userInfo._id === item.userId._id && (
                <i
                  onClick={() => handleDelete(item._id)}
                  className='tw-text-gray-300 hover:tw-text-gray-500 tw-transition-all tw-cursor-pointer tw-px-5 tw-py-1 fa-solid fa-trash-can'
                ></i>
              )}
            </div>
          ))}
      </div>
      {load && (
        <div className='tw-fixed tw-bottom-0 tw-top-0 tw-left-0 tw-right-0 tw-flex tw-justify-center tw-items-center tw-overlay'>
          <Coin color='#007BFF' duration='2s' />
        </div>
      )}
    </div>
  );
};

export default ReviewDetail;
