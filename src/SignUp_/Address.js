import React from 'react';

const Address = () => {
  return (
    <div>
      <div style={styles.group9}></div>
      <div style={styles.group14}>
        <div style={styles.rectangle2}></div>
        <div style={styles.address}>Address</div>
        <div style={styles.name}>이름</div>
      </div>
    </div>
  );
};

const styles = {
  group9: {
    position: 'absolute',
    width: '470px',
    height: '56px',
    left: '356px',
    top: '299px',
  },
  group14: {
    position: 'absolute',
    width: '470px',
    height: '56px',
    left: '356px',
    top: '299px',
  },
  rectangle2: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '371px',
    height: '56px',
    left: '455px',
    top: '299px',
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '50px',
  },
  address: {
    position: 'absolute',
    width: '99px',
    height: '17px',
    left: '356px',
    top: '318px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#000000',
  },
  name: {
    position: 'absolute',
    width: '170px',
    height: '13px',
    left: '479px',
    top: '324px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '13px',
    textAlign: 'center',
    color: '#919191',
  },
};

export default Address;
