export const replies = async (req, res) => {
    console.log("Request received:", req.body);
    const sql = "INSERT INTO replies (`replyId`,`replyAuthor`, `replyMsg`,`replyDate`,`replyTime`) VALUES (?)";
    const values = [
        req.body.replyId,
        req.body.replyAuthor,
        req.body.replyMsg,
        req.body.replyDate,
        req.body.replyTime
    ];
    console.log(values);
    db.query(sql, [values],(err, result)=> {
        if (err) {
            console.error("Database Error:", err);
            return res.json(err);
        }
        console.log("Database Insert Result:", result);
        return res.json(result);
    });
};