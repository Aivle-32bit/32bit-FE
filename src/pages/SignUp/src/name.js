import React from 'react';

const Name = () => {
  return (
    <div style={styles.group11}>
      <div style={styles.rectangle1}></div>
      <div style={styles.inputName}>이름을 입력하세요</div>
      <div style={styles.iconPerson}></div>
      <div style={styles.vector}></div>
      <div style={styles.name}>NAME</div>
    </div>
  );
};

const styles = {
//   group11: {
//     position: 'absolute',
//     width: '445px',
//     height: '56px',
//     left: '381px',
//     top: '227px',
//   },
  rectangle1: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '371px',
    height: '56px',
    left: '455px',
    top: '227px',
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '50px',
  },
  inputName: {
    position: 'absolute',
    width: '170px',
    height: '13px',
    left: '479px',
    top: '253px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '13px',
    textAlign: 'center',
    color: '#919191',
  },
  iconPerson: {
    position: 'absolute',
    width: '25px',
    height: '25px',
    left: '477px',
    top: '244px',
    // 아이콘 이미지를 추가해야 합니다. 예: backgroundImage: 'url(/path/to/icon.png)',
  },
  vector: {
    position: 'absolute',
    left: '37.27%',
    right: '60.78%',
    top: '29.33%',
    bottom: '67.67%',
    background: 'rgba(169, 169, 169, 0.5)',
  },
  name: {
    position: 'absolute',
    width: '73px',
    height: '17px',
    left: '381px',
    top: '248px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#000000',
  },
};

export default Name;
