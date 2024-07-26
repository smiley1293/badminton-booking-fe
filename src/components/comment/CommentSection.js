import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Row } from "react-bootstrap";
import { toast } from 'react-toastify'
import { addCommentApi, checkValidApi, getClubCommentsApi } from "../../services/CommentApi";
import Message from "./Comment"
import StarRatings from "react-star-ratings";
import BookingDialogButton from "../booking/BookingDialogButton";

const ClubComment = ({ clubId, pricerPerHour }) => {
  const [comments, setComment] = useState([]);
  const [stars, setStars] = useState(5);
  const [validString, setValid] = useState("")
  useEffect(() => {
    CheckValid();
    FetchComment();
  }, [clubId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    if (message != "") {
      console.log(message);
      AddComment(message).finally(() => {
        e.target[0].value = "";
      });
    }
  };
  const addStars = (value) => {
    setStars(value)
  }

  const AddComment = async (message, id) => {
    try {
      let res = await addCommentApi(message, clubId, stars, -1)
      if (res) {
        toast.info("Comment sent");
        FetchComment();
        setValid("You have already reviewed this club")
      }
    } catch (e) {
      console.log(e);
      toast.error("Can't send message");
    }
  };
  const CheckValid = async () => {
    try {
      let res = await checkValidApi(clubId)
      if (res) {
        console.log(res)
        if (res.data) {
          setValid(res.data)
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.log(validString)
  }

  const FetchComment = async () => {
    try {
      let res = await getClubCommentsApi(clubId)
      if (res) {
        console.log(res)
        if (res) {
          let tempt = [];
          res
            .sort((a, b) => Date.parse(b.createDate) - Date.parse(a.createDate))
            .forEach((p) => {
              if (p.parentCommentId == 0) {
                tempt.push(p);
              }
            });
          console.log(tempt)
          setComment(tempt);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };




  return (
    <>
      <div className="border border-[#3D4449] border-opacity-25 w-[60vw]">
        <Card>
          <CardHeader>
            <CardTitle className="fw-bold fs-1">Comment</CardTitle>
          </CardHeader>
          <CardBody className="border-b-4">
            {validString === "" ? <form onSubmit={handleSubmit}>
              <Row className="input d-flex justify-content-start">
                <div class="grid grid-cols-12 gap-1 ">
                  <div class="col-span-10">
                    <StarRatings
                      starDimension="30px"
                      rating={stars}
                      starRatedColor="yellow"
                      changeRating={addStars}
                      numberOfStars={5}
                      name='rating'
                    />
                    <input type="text"
                      className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                      placeholder="Type in your thought" />
                  </div>
                  <div class="col-span-2">
                    <button type="submit" className="block w-full py-6 p-2.5 text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]">
                      Send
                    </button>
                  </div>
                </div>
              </Row>
            </form> : <>
              <div className="fs-2 text-center fw-lighter">{
                validString.includes("$btn$") ?
                  (
                    <>
                      <div>{validString.slice(0, 20)} Book to join conversation</div>
                      <BookingDialogButton id={clubId} pricerPerHour={pricerPerHour} />
                    </>
                  )
                  : validString}</div>
            </>}
          </CardBody>
          <div className="my-2" style={{ overflowY: "auto", height: "65vh" }}>
            {comments ? (
              <>
                {comments.map((comment, index) => (
                  <div key={index} className="ms-4">
                    <Message comment={comment} clubId={clubId} />
                  </div>
                ))}
              </>
            ) : (
              <div className="fs-2 text-center fw-lighter">No comments</div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default ClubComment;
