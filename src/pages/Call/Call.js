import React from 'react';
import './Call.css';

const Call = () => {
    return (
        <div className="Call-container">
            <div className="Call-content">
                <div className="Call-form">
                    <h2 className='Call-form-title'>모바일상품 고객센터 안내</h2>
                    <table className='Call-table'>
                        <tbody>
                            <tr>
                                <td>핸드폰 이용 시</td>
                                <td>국번 없이 114 (무료) 또는 080-000-1618 (무료)</td>
                            </tr>
                            <tr>
                                <td>일반전화, 비가입 핸드폰 이용 시</td>
                                <td>1588-0010 (유료)</td>
                            </tr>
                            <tr>
                                <td>외국인 전용 번호</td>
                                <td>일반전화 이용 시 : 02-2190-1180, 핸드폰 이용 시 : 1583번</td>
                            </tr>
                            <tr>
                                <td>해외 발신 번호</td>
                                <td>+82-2-2190-0901 (KT 핸드폰에서 무료)</td>
                            </tr>
                            <tr>
                                <td>이용시간</td>
                                <td>평일: 09:00~18:00 (분실접수, 일시정지, 통화품질, 로밍 상담은 24시간 가능)</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 className='Call-form-title'>서비스 고객센터 안내</h2>
                    <table className='Call-table'>
                        <tbody>
                            <tr>
                                <td>인터넷/PC관리</td>
                                <td>타임코디 1588-1060 / 080-250-0600 (무료)</td>
                            </tr>
                            <tr>
                                <td>퍼스널케어</td>
                                <td>1588-1873</td>
                            </tr>
                            <tr>
                                <td>크린아이</td>
                                <td>080-2500-700</td>
                            </tr>
                            <tr>
                                <td>키보드 암호화</td>
                                <td>1661-1427</td>
                            </tr>
                            <tr>
                                <td>상품별 서비스</td>
                                <td>4G WiBro 080-000-1472</td>
                            </tr>
                            <tr>
                                <td>비즈링고/홈링고</td>
                                <td>1577-1511</td>
                            </tr>
                            <tr>
                                <td>국내/국제전보</td>
                                <td>115</td>
                            </tr>
                            <tr>
                                <td>kt통화카드</td>
                                <td>080-2580-161 / 080-2580-100</td>
                            </tr>
                            <tr>
                                <td>지니뮤직</td>
                                <td>1577-5337</td>
                            </tr>
                            <tr>
                                <td>혜택/포인트 문의</td>
                                <td>유선 포인트 080-2580-111</td>
                            </tr>
                            <tr>
                                <td>기업 서비스</td>
                                <td>기업상품 1588-0114</td>
                            </tr>
                            <tr>
                                <td>Bizmeka</td>
                                <td>080-2580-007</td>
                            </tr>
                            <tr>
                                <td>비즈 서비스 (비즈톡, 크로샷 등)</td>
                                <td>080-2580-303</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Call;
