
import PropTypes from "prop-types";

export default function ReplyBox({ replyId, replyAuthor, replyMsg, replyDate, replyTime }) {
  return (
    <div
      className="reply"
      style={{
        style:"flex",
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: "1px",
        marginBottom: "5px",
        width: "90%",
        position: "relative",
        right:"0px",
      }}
    >
      <div className="reply-user">
        <p id="authorreply" style={{ fontWeight: "bold", marginBottom: "0" }}>
          {replyAuthor}
        </p>
        <p id="timereply" style={{ color: "grey", fontSize: "10px", marginBottom: "0" }}>
          {replyTime} {replyDate}
        </p>
      </div>
      <div className="reply-content">
        <p>{replyMsg}</p>
      </div>
    </div>
  );
}

ReplyBox.propTypes = {
  replyId: PropTypes.number.isRequired,
  replyAuthor: PropTypes.string.isRequired,
  replyMsg: PropTypes.string.isRequired,
  replyDate: PropTypes.string.isRequired,
  replyTime: PropTypes.string.isRequired,
};