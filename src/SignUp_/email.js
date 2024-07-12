import React from 'react';

const Email = () => {
  return (
    <div>
      <div style={styles.group13}></div>
      <div style={styles.group10}></div>
      <div style={styles.group15}></div>
      <div style={styles.rectangle2}></div>
      <div style={styles.email}>EMAIL</div>
      <div style={styles.emailHint}>이메일을 입력하세요.</div>
    </div>
  );
};

const styles = {
  group13: {
    position: 'absolute',
    width: '382px',
    height: '56px',
    left: '372px',
    top: '371px',
  },
  group10: {
    position: 'absolute',
    width: '382px',
    height: '56px',
    left: '372px',
    top: '371px',
  },
  group15: {
    position: 'absolute',
    width: '382px',
    height: '56px',
    left: '372px',
    top: '371px',
  },
  rectangle2: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '299px',
    height: '56px',
    left: '455px',
    top: '371px',
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '50px 10px 10px 50px',
  },
  email: {
    position: 'absolute',
    width: '83.3px',
    height: '17px',
    left: '372px',
    top: '390px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#000000',
  },
  emailHint: {
    position: 'absolute',
    width: '165.76px',
    height: '13px',
    left: '502px',
    top: '397px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '13px',
    textAlign: 'center',
    color: '#909090',
  },
};

export default Email;
