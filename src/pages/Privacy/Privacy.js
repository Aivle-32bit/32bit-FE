import React from 'react';
import './Privacy.css';

const Privacy = () => {
    return (
        <div className="privacy-container">
            <div className="privacy-content">
                <div className="privacy-form">
                    <span className='privacy-form-article'>제1조 (목적)</span>
                    <span className='privacy-form-text'>
                    본 개인정보 보호정책은 재무탐정 서비스에서 개인정보를 어떻게 수집하고 이용하는지를 규정합니다.
                    </span>
                    <span className='privacy-form-article'>제 2 조 (정보의 수집)</span>
                    <span className='privacy-form-text'>
                    회사는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하며, 회원가입 시 개인정보를 요구합니다.
                    </span>
                    <span className='privacy-form-article'>제 3 조 (정보의 이용)</span>
                    <span className='privacy-form-text'>
                    수집된 개인정보는 서비스 제공, 고객 상담, 서비스 개선 등의 목적으로 이용됩니다.
                    </span>
                    <span className='privacy-form-article'>제 4 조 (정보의 보유 및 이용기간)</span>
                    <span className='privacy-form-text'>
                    개인정보는 수집 목적이 달성될 때까지 보유하며, 법령에 따른 의무를 이행한 후 삭제됩니다.
                    </span>
                    <span className='privacy-form-article'>제 5 조 (개인정보 보호 조치)</span>
                    <span className='privacy-form-text'>
                    회사는 개인정보의 안전한 처리를 위해 기술적, 관리적 보호 조치를 취하고 있습니다.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
