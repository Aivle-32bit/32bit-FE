import React, { useState } from 'react';
import './Certification.css';
import { companyregistrations } from '../../api'; // api.js 파일에서 companyregistrations 함수 가져오기
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Certification = () => {
  const [companyName, setCompanyName] = useState('');
  const [representativeName, setCeoName] = useState('');
  const [companyRegistrationNumber, setBusinessNumber] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [image, setRegistrationImage] = useState(null);
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const regExCompanyRegNum = /^\d{3}-\d{2}-\d{5}$/;
  const regExPhoneNumber = /^\d{3}-\d{3,4}-\d{4}$/;

  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'companyName':
        if (!value) errorMsg = '소속 회사명을 입력해주세요.';
        break;
      case 'representativeName':
        if (!value) errorMsg = '대표자명을 입력해주세요.';
        break;
      case 'companyRegistrationNumber':
        if (!value || !regExCompanyRegNum.test(value)) {
          errorMsg = '올바른 사업자 등록 번호를 입력해주세요. (ex: 123-45-67890)';
        }
        break;
      case 'companyAddress':
        if (!value) errorMsg = '사업자 주소를 입력해주세요.';
        break;
      case 'companyPhoneNumber':
        if (!value || !regExPhoneNumber.test(value)) {
          errorMsg = '올바른 전화번호를 입력해주세요. (ex: 010-1234-5678)';
        }
        break;
      case 'businessType':
        if (!value) errorMsg = '사업 종류를 입력해주세요.';
        break;
      case 'image':
        if (!value) errorMsg = '사업자 등록증 이미지를 업로드해주세요.';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'companyName':
        setCompanyName(value);
        break;
      case 'representativeName':
        setCeoName(value);
        break;
      case 'companyRegistrationNumber':
        setBusinessNumber(value);
        break;
      case 'companyAddress':
        setCompanyAddress(value);
        break;
      case 'companyPhoneNumber':
        setCompanyPhoneNumber(value);
        break;
      case 'businessType':
        setBusinessType(value);
        break;
      default:
        break;
    }
    validateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(errors).some(error => error)) {
      toast.error('폼을 올바르게 작성해주세요.', { autoClose: 5000 });
      return;
    }

    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('representativeName', representativeName);
    formData.append('companyAddress', companyAddress);
    formData.append('companyPhoneNumber', companyPhoneNumber);
    formData.append('companyRegistrationNumber', companyRegistrationNumber);
    formData.append('businessType', businessType);
    formData.append('image', image);

    try {
      const response = await companyregistrations(formData);
      console.log('서버 응답:', response);
      toast.success('사업자 등록이 성공적으로 완료되었습니다!', { autoClose: 5000 });
      navigate('/mypage/profile');
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
      toast.error('사업자 등록 중 오류가 발생했습니다.', { autoClose: 5000 });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegistrationImage(file);
    validateField('image', file);
  };

  return (
      <div className="certification-container">
        <ToastContainer />
        <div className="certification-content">
          <form className="certification-form" onSubmit={handleSubmit}>
            <span className="certification-title">소속 회사 인증</span>
            <span className="certification-intro">재무탐정의 AI 재무 분석 서비스를 이용하기 위해서는, 소속 회사 인증이 필요합니다.</span>

            <div className="certification-form-group">
              <label htmlFor="companyName">소속 회사명</label>
              <input
                  type="text"
                  id="companyName"
                  className="input-company-name"
                  name="companyName"
                  placeholder={'ex) 32BIT'}
                  value={companyName}
                  onChange={handleInputChange}
                  required
              />
              {errors.companyName && <div className="cert-error-message">{errors.companyName}</div>}
            </div>

            <div className="certification-form-group">
              <label htmlFor="representativeName">대표자명</label>
              <input
                  type="text"
                  id="representativeName"
                  className="input-ceo-name"
                  name="representativeName"
                  value={representativeName}
                  placeholder={'ex) 홍길동'}
                  onChange={handleInputChange}
                  required
              />
              {errors.representativeName && <div className="cert-error-message">{errors.representativeName}</div>}
            </div>

            <div className="certification-form-group">
              <label htmlFor="companyRegistrationNumber">사업자 등록 번호</label>
              <input
                  type="text"
                  id="companyRegistrationNumber"
                  className="input-business-number"
                  name="companyRegistrationNumber"
                  placeholder={'ex) 123-45-67890'}
                  value={companyRegistrationNumber}
                  onChange={handleInputChange}
                  required
              />
              {errors.companyRegistrationNumber && <div className="cert-error-message">{errors.companyRegistrationNumber}</div>}
            </div>

            <div className="certification-form-group">
              <label htmlFor="companyAddress">사업자 주소</label>
              <input
                  type="text"
                  id="companyAddress"
                  className="input-business-number"
                  name="companyAddress"
                  placeholder={'ex) 서울시 강남구 역삼동 123-45'}
                  value={companyAddress}
                  onChange={handleInputChange}
                  required
              />
              {errors.companyAddress && <div className="cert-error-message">{errors.companyAddress}</div>}
            </div>

            <div className="certification-form-group">
              <label htmlFor="companyPhoneNumber">사업자 전화번호</label>
              <input
                  type="text"
                  id="companyPhoneNumber"
                  className="input-business-number"
                  name="companyPhoneNumber"
                  placeholder={'ex) 010-1234-5678'}
                  value={companyPhoneNumber}
                  onChange={handleInputChange}
                  required
              />
              {errors.companyPhoneNumber && <div className="cert-error-message">{errors.companyPhoneNumber}</div>}
            </div>

            <div className="certification-form-group">
              <label htmlFor="businessType">사업 종류</label>
              <input
                  type="text"
                  id="businessType"
                  className="input-business-type"
                  name="businessType"
                  placeholder={'ex) 소프트웨어 개발업'}
                  value={businessType}
                  onChange={handleInputChange}
                  required
              />
              {errors.businessType && <div className="cert-error-message">{errors.businessType}</div>}
            </div>

            <div className="certification-form-group">
              <label htmlFor="image">사업자 등록증 이미지</label>
              <div className="file-input-wrapper">
                <input
                    type="file"
                    id="image"
                    className="input-registration-image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <label htmlFor="image" className="custom-file-upload">
                  파일 선택
                </label>
                <span className="file-name">
                {image ? image.name : '선택된 파일 없음'}
              </span>
              </div>
              {errors.image && <div className="cert-error-message">{errors.image}</div>}
            </div>

            <button
                type="submit"
                className="certification-submit-button"
            >
              제출
            </button>
          </form>
        </div>
      </div>
  );
};

export default Certification;