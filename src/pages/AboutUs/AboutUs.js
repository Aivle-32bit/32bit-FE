import React from 'react';
// CSS
import './AboutUs.css';
// image
import doguri from '../../assets/images/doguri.png';
import jaemin from '../../assets/images/jaemin.jpg';
const teamMembers = [
    {
      name: '이재민',
      photo: jaemin,
      description: 'Data analysis and team leader'
    },
    {
      name: '이현석',
      photo: doguri,
      description: 'Backend development and technology team leader'
    },
    {
      name: '박현민',
      photo: doguri,
      description: 'Data Analytics and Developers'
    },
    {
      name: '차예성',
      photo: doguri,
      description: 'Data Analytics and Developers'
    },
    {
      name: '장서영',
      photo: doguri,
      description: 'Front-end developer and design team'
    },
    {
      name: '배수진',
      photo: doguri,
      description: 'Backend developer and design developer'
    },
    {
      name: '이지원',
      photo: doguri,
      description: 'Front-end developer and API integration'
    }
  ];

function AboutUs() {

  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="service-intro">
          <h1 className="service-intro-label">FINANCIAL DETECTIVE</h1>
          <p>FINANCIAL DETECTIVE(재무탐정)은 재무제표를 기반으로 기업의 재무상태를 분석 및 예측하여,<br /><br />객관적으로 재무 안정성을 평가하고 합리적인 의사결정을 돕습니다.</p>
        </div>
        <div className="team-intro">
          <h1 className="service-intro-label">TEAM</h1>
          <p>32BIT는 다양한 전공 배경을 가진 팀원들로 구성되어 시너지를 내고 있습니다.</p>
          <div className="team-cards">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <img src={member.photo} alt={`${member.name} 사진`} loading="lazy" />
                <h3>{member.name}</h3>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
