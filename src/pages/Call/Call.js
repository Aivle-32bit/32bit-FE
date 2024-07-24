import React from 'react';
import './Call.css';

const Contact = () => {
    return (
        <div className="call-contact-container">
            <h1>고객센터 안내</h1>
            <section className="call-mobile-contact">
                <h2>모바일상품 고객센터 안내</h2>
                <h3>ARS 메뉴 안내</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>전화번호</th>
                            <td>핸드폰 이용 시 : 국번 없이 114 (무료) 또는 080-000-1618 (무료)</td>
                        </tr>
                        <tr>
                            <th>일반전화, 비가입 핸드폰 이용 시</th>
                            <td>1588-0010 (유료)</td>
                        </tr>
                        <tr>
                            <th>외국인 전용 번호</th>
                            <td>일반전화 이용 시 : 02-2190-1180, 핸드폰 이용 시 : 1583번</td>
                        </tr>
                        <tr>
                            <th>해외 발신 번호</th>
                            <td>+82-2-2190-0901 (KT 핸드폰에서 무료)</td>
                        </tr>
                        <tr>
                            <th>이용시간</th>
                            <td>평일: 09:00~18:00 (분실접수, 일시정지, 통화품질, 로밍 상담은 24시간 가능)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="call-service-contact">
                <h2>서비스 고객센터 안내</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>인터넷/PC관리</th>
                            <td>타임코디 1588-1060 / 080-250-0600 (무료)</td>
                        </tr>
                        <tr>
                            <th>퍼스널케어</th>
                            <td>1588-1873</td>
                        </tr>
                        <tr>
                            <th>크린아이</th>
                            <td>080-2500-700</td>
                        </tr>
                        <tr>
                            <th>키보드 암호화</th>
                            <td>1661-1427</td>
                        </tr>
                        <tr>
                            <th>상품별 서비스</th>
                            <td>4G WiBro 080-000-1472</td>
                        </tr>
                        <tr>
                            <th>비즈링고/홈링고</th>
                            <td>1577-1511</td>
                        </tr>
                        <tr>
                            <th>국내/국제전보</th>
                            <td>115</td>
                        </tr>
                        <tr>
                            <th>kt통화카드</th>
                            <td>080-2580-161 / 080-2580-100</td>
                        </tr>
                        <tr>
                            <th>지니뮤직</th>
                            <td>1577-5337</td>
                        </tr>
                        <tr>
                            <th>혜택/포인트 문의</th>
                            <td>유선 포인트 080-2580-111</td>
                        </tr>
                        <tr>
                            <th>기업 서비스</th>
                            <td>기업상품 1588-0114</td>
                        </tr>
                        <tr>
                            <th>Bizmeka</th>
                            <td>080-2580-007</td>
                        </tr>
                        <tr>
                            <th>비즈 서비스 (비즈톡, 크로샷 등)</th>
                            <td>080-2580-303</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Contact;
