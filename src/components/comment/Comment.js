import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from 'react-toastify'
import { addCommentApi, getRepliesApi, likeCommentApi } from "../../services/CommentApi";
import StarRatings from "react-star-ratings";
function CompareDate(date1, date2) {
  const diffInMilliseconds = Math.abs(date2 - date1);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  if (diffInMinutes <= 60) {
    return `${diffInMinutes} minutes`;
  } else if (diffInMinutes <= 24 * 60) {
    return `${Math.floor(diffInMinutes / 60)} hours`;
  } else {
    return `${Math.floor(diffInMinutes / (24 * 60))} days`;
  }
}

const Message = ({ comment, clubId }) => {
  const [onHovered, setHovered] = useState(false);
  const [onLikeHovered, setLikeHovered] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const [replies, setReplies] = useState([]);
  const FetchReplies = async () => {
    try {
      let res = await getRepliesApi(comment.id)
      console.log(res)
      if (res) {
        let tempt = [
          ...res.sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate)),
        ]
        setReplies(tempt)
        console.log(replies)
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(comment);
    FetchReplies();
  }, []);
  const Like = async () => {
    try {
      let res = await likeCommentApi(comment.id)
      if (res) {
        toast.info("Comment liked");
        comment.likes += 1
      }
    } catch (e) {
      console.log(e);
      toast.error("Can't like message");
    }
  };

  const AddComment = async (message, id) => {
    try {
      let res = await addCommentApi(message, clubId, 0, id)
      if (res) {
        toast.info("Comment sent");
        FetchReplies();
      }
    } catch (e) {
      console.log(e);
      toast.error("Can't send message");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    if (message !== "") {
      console.log(message);
      AddComment(message, comment.id).finally(() => {
        e.target[0].value = "";
      });
    }
  };

  return (
    <>
      <div className="mb-2 mt-3 grid grid-cols-12 gap-1" style={{ width: "100%" }}>
        <div className="col-span-auto" style={{ width: "60px", top: "0" }}>
          <img
            src="https://images.unsplash.com/photo-1707944605002-0142810a861d?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="" style={{ width: "50px", borderRadius: "100%" }} />
        </div>

        <Col xs={10} className="col-span-10 ms-1 align-items-center">
          <div
            className="d-flex flex-column border"
            style={{ padding: "0px 10px", borderRadius: "8px" }}
          >
            <div className="fs-6 fw-lighter grid grid-cols-12">
              <div className="col-span-12">
                {comment.author.fullName}
                {comment.stars > 0 ? <StarRatings
                  starDimension="30px"
                  rating={comment.stars}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name='rating'
                /> : <></>}
              </div>
            </div>
            <div style={{ fontSize: "22px" }}>{comment.detail}</div>
          </div>
          <div className="w-100">
            <div className="grid grid-cols-12 gap-1">
              <div
                className="fw-lighter col-auto"
                onClick={() => {
                  Like()
                }}
                onMouseEnter={() => {
                  setLikeHovered(true);
                }}
                onMouseOut={() => {
                  setLikeHovered(false);
                }}
                style={{
                  cursor: "default",
                  color: `${onLikeHovered ? "rgb(133, 58, 232)" : "rgb(0,0,0)"}`,
                }}
              >Like ({comment.likes})</div>
              <div
                className="fw-lighter w-[300px]"
                onClick={() => {
                  setOpened(!isOpened);
                  console.log(replies);
                }}
                onMouseEnter={() => {
                  setHovered(true);
                }}
                onMouseOut={() => {
                  setHovered(false);
                }}
                style={{
                  cursor: "default",
                  color: `${onHovered ? "rgb(133, 58, 232)" : "rgb(0,0,0)"}`,
                }}
              >
                {isOpened ? "Close Replies" : `See Reply (${replies.length})`}
                {"|  "}
                {CompareDate(Date.parse(comment.createdTime), Date.now())}
              </div>
            </div>
          </div>
          <div className="ms-2">
            {isOpened ? (
              <>
                {replies.map((reply, index) => (
                  <Message comment={reply} clubId={clubId} key={index} />
                ))}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <div class="grid grid-cols-12 gap-1">
                    <div class="col-span-10">
                      <input type="text"
                        className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                        placeholder="Type in your thought" />
                    </div>
                    <div class="col-span-2">
                      <button type="submit" className="block w-full p-2.5 text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]">
                        Reply
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </div>
    </>
  );
}
export default Message;
