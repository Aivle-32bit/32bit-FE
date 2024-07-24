import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TermsModal from './TermsModal';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState({
    terms: false,
    privacy: false,
  });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    const allAgreed = Object.values(termsChecked).every(Boolean);
    setAllChecked(allAgreed);
  }, [termsChecked]);

  const handleAllChecked = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setTermsChecked({
      terms: newChecked,
      privacy: newChecked,
    });
  };

  const handleTermsChecked = (key) => {
    const newChecked = !termsChecked[key];
    setTermsChecked({
      ...termsChecked,
      [key]: newChecked,
    });
  };

  return (
      <div className="terms-container">
        <div className="terms-content">
          <div className="terms-popup">
            <h1 className="terms-title">재무탐정 이용약관</h1>
            <div className="terms-box">
              <div className="terms-item all-terms" onClick={handleAllChecked}>
                <div className={`terms-checkbox ${allChecked ? 'checked' : ''}`} aria-label="Check All"></div>
                <div className="terms-text">아래 내용을 모두 확인하였으며 전체 동의합니다.</div>
              </div>
              <hr className="terms-divider" />
              <div className="terms-item" onClick={() => handleTermsChecked('terms')}>
                <div className={`terms-checkbox ${termsChecked.terms ? 'checked' : ''}`} aria-label="Agree to Terms of Use"></div>
                <div className="terms-text">
                  <span>재무탐정 이용약관 이용약관 동의 <strong>(필수)</strong></span>
                </div>
                <button className="more" onClick={(e) => {e.stopPropagation(); setShowTermsModal(true);}}>더 보기</button>
              </div>
              <div className="terms-item" onClick={() => handleTermsChecked('privacy')}>
                <div className={`terms-checkbox ${termsChecked.privacy ? 'checked' : ''}`} aria-label="Agree to Privacy Policy"></div>
                <div className="terms-text">
                  <span>재무탐정 이용약관 개인정보 수집ㆍ이용 동의 <strong>(필수)</strong></span>
                </div>
                <button className="more" onClick={(e) => {e.stopPropagation(); setShowPrivacyModal(true);}}>더 보기</button>
              </div>
            </div>
            <div className="terms-submit-section">
              <Link to={allChecked ? '/signup' : '#'} className={`terms-button-link ${!allChecked ? 'disabled' : ''}`}>
                <button
                    className={`terms-button ${!allChecked ? 'disabled' : ''}`}
                    disabled={!allChecked}
                >
                  가입하기
                </button>
              </Link>
            </div>
            <a href="../" className="terms-link">홈으로 이동</a>
          </div>
        </div>

        <TermsModal
            show={showTermsModal}
            onClose={() => setShowTermsModal(false)}
            title="재무탐정 이용약관"
        >
          <p className='terms-article'>제 1 조 (목적)</p>
          <p className='terms-article-text'>본 약관은 재무탐정 서비스 이용에 필요한 기본적인 사항을 규정합니다.</p>
          <p className='terms-article'>제 2 조 (약관의 효력 및 변경)</p>
          <p className='terms-article-text'>본 약관은 재무탐정 웹사이트에 게시함으로써 효력이 발생합니다. 회사는 필요시 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지됩니다.</p>
          <p className='terms-article'>제 3 조 (회원의 의무)</p>
          <p className='terms-article-text'>회원은 다음 행위를 하여서는 안 됩니다: 타인의 명의를 도용하여 가입, 부정한 목적을 위한 이용, 회사의 운영을 방해하는 행위.</p>
          <p className='terms-article'>제 4 조 (개인정보 보호)</p>
          <p className='terms-article-text'>회사는 회원의 개인정보를 보호하며, 관련 법령에 따라 이를 처리합니다.</p>
          <p className='terms-article'>제 5 조 (계약 해지)</p>
          <p className='terms-article-text'>회원은 언제든지 이용 계약을 해지할 수 있으며, 회사는 일정 사유가 발생할 경우 이용 계약을 해지할 수 있습니다.</p>
          <button className="modal-close-button" onClick={() => setShowTermsModal(false)}>확인</button>
        </TermsModal>

        <TermsModal
            show={showPrivacyModal}
            onClose={() => setShowPrivacyModal(false)}
            title="재무탐정 개인정보 수집ㆍ이용 동의"
        >
          <p className='terms-article'>1. 개인정보의 수집·이용 목적</p>
          <p className='terms-article-text'>재무탐정 서비스 이용을 위한 통합 계정 생성, 회원관리 및 본인확인, 서비스 개선.</p>
          <p className='terms-article'>2. 수집 항목</p>
          <p className='terms-article-text'>이메일, 비밀번호, 이름, 생년월일, 휴대폰 번호.</p>
          <p className='terms-article-text'>서비스 이용과정에서 단말기정보, IP주소, 쿠키, 방문일시, 부정이용기록, 서비스 이용 기록 등의 정보가 자동으로 수집될 수 있습니다</p>
          <p className='terms-article'>3. 개인정보의 보유 및 이용기간</p>
          <p className='terms-article-text'>계정 탈퇴 시까지. 단, 관련 법령에 따라 일정 기간 보유할 수 있습니다.</p>
          <p className='terms-article-text'>※ 위와 같이 개인정보를 수집·이용하는데 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우, 통합계정 회원가입이 제한됩니다.</p>
          <button className="modal-close-button" onClick={() => setShowPrivacyModal(false)}>확인</button>
        </TermsModal>
      </div>
  );
};

export default TermsAndConditions;