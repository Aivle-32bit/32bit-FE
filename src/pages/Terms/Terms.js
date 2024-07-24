import React from 'react';
import './Terms.css';

const TermsAndConditions = () => {
    return (
        <div className="termspage-container">
            <div className="termspage-content">
                <div className="termspage-form">
                    <span className='termspage-form-article'>제1조 (목적)</span>
                    <span className='termspage-form-text'>
                    본 약관은 재무탐정 서비스 이용에 필요한 기본적인 사항을 규정합니다.
                    </span>
                    <span className='termspage-form-article'>제 2 조 (약관의 효력 및 변경)</span>
                    <span className='termspage-form-text'>
                    본 약관은 재무탐정 웹사이트에 게시함으로써 효력이 발생합니다. 회사는 필요시 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지됩니다.
                    </span>
                    <span className='termspage-form-article'>제 3 조 (회원의 의무)</span>
                    <span className='termspage-form-text'>
                    회원은 다음 행위를 하여서는 안 됩니다: 타인의 명의를 도용하여 가입, 부정한 목적을 위한 이용, 회사의 운영을 방해하는 행위.
                    </span>
                    <span className='termspage-form-article'>제 4 조 (개인정보 보호)</span>
                    <span className='termspage-form-text'>
                    회사는 회원의 개인정보를 보호하며, 관련 법령에 따라 이를 처리합니다.
                    </span>
                    <span className='termspage-form-article'>제 5 조 (계약 해지)</span>
                    <span className='termspage-form-text'>
                    회원은 언제든지 이용 계약을 해지할 수 있으며, 회사는 일정 사유가 발생할 경우 이용 계약을 해지할 수 있습니다.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
