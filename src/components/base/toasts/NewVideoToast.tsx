import React from "react";
import { useNavigate } from "react-router-dom";
import { INewVideoToastProps } from "./NewVideoToast.props";

const NewVideoToast: React.FC<INewVideoToastProps> = ({ userEmail, title }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')}>
      <div> {userEmail} </div>
      <div> {title} </div>
    </div>
  );
};

export default NewVideoToast;
