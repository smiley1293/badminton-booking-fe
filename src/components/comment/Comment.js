import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import { toast } from 'react-toastify'
import { addCommentApi, addReplyApi, getCommentsApi } from "../../services/CommentApi";
import { getOtherProfileApi } from "../../services/UserApi";
import Avatar from '../avatar/Avatar';
export function CompareDate(date1, date2) {  
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


export const Message = ({ value }) => {
    const [onHovered, setHovered] = useState(false);
    const [isOpened, setOpened] = useState(false);
    const [img, setImg] = useState(Avatar);
    const [profile, setUser] = useState();
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        FetchUser();
        FetchReplies();
    }, [value]);

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

    const AddComment = async (message) => {
        try {
            let res = await addReplyApi(message)
            if (res) {
                toast.info("Comment sent");
            }
        } catch (e) {
            console.log(e);
            toast.error("Can't send message");
        }
    };

    const FetchReplies = async () => {
        try {
            let res = await getCommentsApi()
            if (res?.data) {
                console.log(res?.data);
                setReplies([
                    ...res?.data.sort((a, b) => Date.parse(b.CreateDate) - Date.parse(a.CreateDate)),
                ]);
            }
        } catch (e ) {
            console.log(e);
        }
    };
    //change if comment already include profile
    const FetchUser = async () => {
        try {
          let res = await getOtherProfileApi(value.AuthorId)
          if (res?.data) {
            setUser(res?.data);
            if (res?.data.ProfileBlobUrl) {
              var img = new Image();
              img.src = res?.data.ProfileBlobUrl;
              if (img.height != 0) setImg(res?.data.ProfileBlobUrl);
            }
          }
        } catch (e) {
          console.log(e);
        }
      };
    return (
        <>
            <Row className="mb-2 mt-3" style={{ width: "100%" }}>
                <div className="" style={{ width: "60px", top: "0" }}>
                    <img src={img} className="" style={{ width: "50px", borderRadius: "100%" }} />
                </div>

                <Col xs={10} className="ms-1 align-items-center">
                    <div
                        className="d-flex flex-column border"
                        style={{ padding: "0px 10px", borderRadius: "8px" }}
                    >
                        <div className="fs-6 fw-lighter">{profile?.Fullname}</div>
                        <div style={{ fontSize: "22px" }}>{value.Detail}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div
                                className="fw-lighter"
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
                                {CompareDate(Date.parse(value.CreatedTime), Date.now())}
                            </div>
                        </div>
                    </div>
                    <div className="ms-2">
                        {isOpened ? (
                            <>
                                {replies.map((reply, index) => (
                                    <Message value={reply} key={index} />
                                ))}
                                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                                    <Row className="input d-flex justify-content-start">
                                        <Col xs={10}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Type in your thought"
                                            />
                                        </Col>
                                        <Col xs={2}>
                                            <button className="btn btn-warning text-white" type="submit">
                                                Send
                                            </button>
                                        </Col>
                                    </Row>
                                </form>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    );
}

const ClubComment = ({ clubId}) => {
    const [comments, setComment] = useState([]);
  
    useEffect(() => {
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
  
    const AddComment = async (message) => {
      try {
        let res = await addCommentApi(message)
        if (res) {
          toast.info("Comment sent");
          FetchComment();
        }
      } catch (e) {
        console.log(e);
        toast.error("Can't send message");
      }
    };
  
    const FetchComment = async () => {
      try {
        let res = await getCommentsApi(clubId)
        if (res) {
          let tempt= [];
          res.data
            .sort((a, b) => Date.parse(b.CreateDate) - Date.parse(a.CreateDate))
            .forEach((p) => {
              if (p.ReplyToCommentId == null) {
                tempt.push(p);
              }
            });
          setComment(tempt);
        }
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <>
        <div className="track-comment">
          <Card>
            <CardHeader>
              <CardTitle className="fw-bold fs-1">Comment</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Row className="input d-flex justify-content-start">
                  <Col xs={10}>
                    <input type="text" className="form-control" placeholder="Type in your thought" />
                  </Col>
                  <Col xs={2}>
                    <button className="btn btn-warning text-white" type="submit">
                      Send
                    </button>
                  </Col>
                </Row>
              </form>
            </CardBody>
            <div className="my-2" style={{ overflowY: "auto", height: "65vh" }}>
              {comments && comments.length > 0 ? (
                <>
                  {comments.map((comment, index) => (
                    <div key={index} className="ms-4">
                      <Message value={comment} />
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
