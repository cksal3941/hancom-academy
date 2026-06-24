const ERROR_MESSAGES = {
  'auth/popup-closed-by-user':       '로그인 창이 닫혔습니다. 다시 시도해 주세요.',
  'auth/popup-blocked':              '팝업이 차단되었습니다. 브라우저 팝업 차단을 해제해 주세요.',
  'auth/cancelled-popup-request':    '로그인 요청이 취소되었습니다.',
  'auth/account-exists-with-different-credential':
                                     '이미 다른 방법으로 가입된 계정입니다.',
  'auth/network-request-failed':     '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.',
  'auth/too-many-requests':          '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
  'auth/user-disabled':              '비활성화된 계정입니다. 관리자에게 문의하세요.',
  'auth/operation-not-allowed':      '해당 로그인 방법이 활성화되지 않았습니다.',
  'auth/configuration-not-found':    'Firebase Authentication 설정이 완료되지 않았습니다.',
  'auth/unauthorized-domain':        '현재 접속한 주소가 Firebase 승인 도메인에 등록되지 않았습니다.',
  'auth/admin-restricted-operation': '현재 프로젝트에서 회원가입이 허용되지 않았습니다.',
  'auth/internal-error':             '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  'auth/user-not-found':             '등록되지 않은 이메일입니다.',
  'auth/wrong-password':             '비밀번호가 올바르지 않습니다.',
  'auth/invalid-email':              '올바른 이메일 형식이 아닙니다.',
  'auth/invalid-credential':         '이메일 또는 비밀번호가 올바르지 않습니다.',
  'auth/email-already-in-use':       '이미 사용 중인 이메일입니다.',
  'auth/weak-password':              '비밀번호는 6자 이상이어야 합니다.',
  'auth/missing-email':              '이메일을 입력해 주세요.',
  'auth/missing-password':           '비밀번호를 입력해 주세요.',
}

export function getFirebaseErrorMessage(error) {
  if (ERROR_MESSAGES[error?.code]) return ERROR_MESSAGES[error.code]
  if (error?.message?.includes('Apple 로그인이')) return error.message
  if (error?.message?.includes('Firebase가 설정되지')) return error.message
  return '오류가 발생했습니다. 다시 시도해 주세요.'
}
