

type sendEmailContentType = {
    id: string
    userId: string
    title: string
    senderEmail: string
    recipientEmail: string
    isPublic: string
    content: string
    deliveryTime: Date
}
const SendEmailContent = (data: sendEmailContentType) => {
    return useMyOtherFetch("/api/user/email/writing", {
      method: "post",
      body: data
    });
  };
// like/{emailId}
const LikeEmailContent = (emailId: string) => {
  return useMyOtherFetch(`/api/user/email/like/${emailId}`, {
    method: "get",
    params: {
      emailId: emailId
    }
  });
};
export { SendEmailContent, LikeEmailContent };
  