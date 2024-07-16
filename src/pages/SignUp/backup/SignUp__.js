import React from 'react';
import './SignUp__.css'; // CSS 파일을 불러옵니다.

const Address = () => {
  return (
    <div>
      <div className="group9"></div>
      <div className="group14">
        <div className="rectangle2"></div>
        <div className="address">Address</div>
        <div className="name">이름</div>
      </div>
    </div>
  );
};

const CheckPW = () => {
  return (
    <div className="group9">
      <div className="group14">
        <div className="rectangle2"></div>
        <div className="company">Company</div>
        <div className="name">이름</div>
      </div>
    </div>
  );
};

const Email = () => {
  return (
    <div>
      <div className="group13"></div>
      <div className="group10"></div>
      <div className="group15"></div>
      <div className="rectangle2"></div>
      <div className="email">EMAIL</div>
      <div className="emailHint">이메일을 입력하세요.</div>
    </div>
  );
};

const Name = () => {
  return (
    <div className="group11">
      <div className="rectangle1"></div>
      <div className="inputName">이름을 입력하세요</div>
      <div className="iconPerson"></div>
      <div className="vector"></div>
      <div className="name">NAME</div>
    </div>
  );
};

const SignUp__ = () => {
  return (
    <div>
      <Address />
      <CheckPW />
      <Email />
      <Name />
    </div>
  );
};

export default SignUp__;
export { Address, CheckPW, Email, Name };
