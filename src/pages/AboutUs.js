import React from 'react';
import '../About/About.css';

const teamMembers = [
  {
    name: '이재민',
    photo: '../images/cap.jpg',
    description: 'Data analysis and team leader'
  },
  {
    name: '이현석',
    photo: 'path_to_photo2.jpg',
    description: 'Backend development ad technology team leader'
  },
  {
    name: '박현민',
    photo: 'path_to_photo3.jpg',
    description: 'Data Analytics and Developers'
  },
  {
    name: '차예성',
    photo: 'path_to_photo4.jpg',
    description: 'Data Analytics and Developers '
  },
  {
    name: '장서영',
    photo: 'path_to_photo5.jpg',
    description: 'Front-end developer and design team'
  },
  {
    name: '배수진',
    photo: 'path_to_photo6.jpg',
    description: 'Backend developer and design developer'
  },
  {
    name: '이지원',
    photo: 'path_to_photo7.jpg',
    description: 'Front-end developer and API integration'
  }
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.photo} alt={`${member.name} 사진`} className="team-photo"/>
            <h3>{member.name}</h3>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
