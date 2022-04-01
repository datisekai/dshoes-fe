import axios from "axios";
import React, { useEffect, useState } from "react";
import { Coin } from "react-cssfx-loading/lib";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { base_comments } from "../../api/config";
import { calculateCreatedTime } from "../../utils/changeTime";
import swal from "sweetalert";
import { toast } from "react-toastify";

const ReviewDetail = () => {
  const userInfo = useSelector((state) => state.user);
  const { id } = useParams();
  const [comments, setComments] = useState();
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate()

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
        setContent('')
        setComments([...comments, res.data.comment])
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
    <div className="mt-3">
      <h2 className="text-gray-100">Reviewed</h2>
      {userInfo && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            id=""
            value={content}
            required
            minLength={1}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your review..."
            className="px-5 py-1 rounded-md border-0 w-full text-[#ccc] border-b border-[#007BFF] bg-transparent mt-2 outline-none"
            autoComplete="off"
          />
        </form>
      )}
      {!userInfo && (
        <p className="text-gray-100 text-center">
          You must be <span onClick={() => navigate(`/login?productId=${id}`)} className="text-red-400 underline cursor-pointer hover:text-red-700 transition-all">logged in</span>{" "}
          to comment
        </p>
      )}
      <div className="mt-6">
        {comments &&
          comments.map((item, index) => (
            <div key={index} className="mt-3 flex items-center justify-between">
              <div>
                <h3 className="text-gray-100 text-md underline">
                  {item.userId.email}
                </h3>
                <p className="text-sm text-[#ccc]">
                  {calculateCreatedTime(item.createdAt)}
                </p>
                <p className="text-[#ccc] text-sm py-2">{item.content}</p>
              </div>
              {userInfo && userInfo._id === item.userId._id && (
                <i
                  onClick={() => handleDelete(item._id)}
                  className="text-gray-300 hover:text-gray-500 transition-all cursor-pointer px-5 py-1 fa-solid fa-trash-can"
                ></i>
              )}
            </div>
          ))}
      </div>
      {load && (
        <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center overlay">
          <Coin color="#007BFF" duration="2s" />
        </div>
      )}
    </div>
  );
};

export default ReviewDetail;
