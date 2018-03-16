export const URL = `https://cloud-api${process.env.XLHB_SUFFIX}/`
export const SCALE_URL = `https://cloud-api.admin${process.env.XLHB_SUFFIX}/`
export const uploadUrl = `${URL}upload/v3/file.upload`

export let uriObj = {
  passport: 'passport',
  user: 'user',
  admin: 'admin',
  home: 'home',
  warning: 'warning',
  test: 'test',
  issue: 'issue',
  behavior: 'behavior',
  training: 'training',
  'group-training': 'group-training',
  upload: 'upload',
  '3213131': '3213213213413',
  guiyang: 'guiyang',
  feeling: 'feeling',
  tell: 'tell'
}
export var roleArr = [
  {name: '学生', value: 'STUDENT'},
  {name: '通用', value: 'GENERAL'},
  {name: '家长', value: 'PARENT'},
  {name: '心理老师', value: 'PSY_TEACHER'},
  {name: '班主任', value: 'CLASS_TEACHER'},
  {name: '教职工', value: 'TEACHER'},
  {name: '校长', value: 'HEADMASTER'},
  {name: '校级管理员', value: 'MANAGER'},
  {name: '教育局', value: 'EDUCATION_MANAGER'}
]
export var roleObj = {
  STUDENT: '学生',
  TEACHER: '教职工',
  PARENT: '家长',
  CLASS_TEACHER: '班主任',
  MANAGER: '校级管理员',
  EDUCATION_MANAGER: '教育局',
  PSY_TEACHER: '心理老师',
  HEADMASTER: '校长',
  SELF: '本人',
  GENERAL: '通用',
  NOT_STARTED: '未开始',
  TESTING: '进行中',
  ENDED: '已结束',
  ON_TIME: '已报',
  UNDECLARED: '未报',
  LATELY: '迟报',
  NO: '申请查看',
  START: '审核中',
  PASS: '申请查看通过',
  REJECT: '审核不通过',
  NOT_TESTED: '重新测评',
  EXPIRED: '已过期',
  TESTED: '查看报告',
  WAITING: '待处理',
  PROCESSING: '处理中',
  FINISHED: '已处理',
  RECOVERED: '已恢复',
  RECOVERING: '恢复中',
  UNABLE: '无法处理',
  BATCH: '普测',
  INDIVIDUAL: '个测',
  OTHER: '未知',
  PC: '电脑端',
  IOS: 'APP端',
  ANDROID: 'APP端'
}
export var levelObj = {
  WARNING_LEVEL_RED: '红色预警',
  WARNING_LEVEL_ORANGE: '橙色预警',
  WARNING_LEVEL_YELLOW: '黄色预警',
  WARNING_LEVEL_NO: '五预警'
}
export var warningSource = {
  TEST: '心理测评',
  BEHAVIOR: '行为记录',
  WARNING: '预警处理',
  GROUP_TRAINING: '团体培训'
}
export var trainType = {
  TRAINING_TEACHER: '教师培训',
  TRAINING_PARENT: '家长培训',
  TRAINING_STUDENT: '学生培训'
}
export var trainTypeArr = [
  {
    type: 'TRAINING_TEACHER',
    name: '教师培训'
  },
  {
    type: 'TRAINING_PARENT',
    name: '家长培训'
  },
  {
    type: 'TRAINING_STUDENT',
    name: '学生培训'
  }
]
export var fileUploadAllowed = [
  'jpg',
  'png',
  'gif',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'pdf',
  'pps',
  'ppt',
  'pptx'
]
export var eduStatisExport = {
  examineIndex: {
    method: 'edu.assessments.export',
    app: 'guiyang'
  },
  examinePercent: {
    method: 'edu.assessments.export',
    app: 'guiyang',
    showType: 'PERCENT'
  },
  examineDetail: {
    method: 'edu.assessments.export',
    app: 'guiyang',
    showType: 'DETAIL'
  },
  declare: {
    method: 'edu.declarations.export',
    app: 'guiyang'
  },
  warn: {
    method: 'edu.warnings.export',
    app: 'warning'
  },
  activity: {
    method: 'test.edu.activity.statistics.download',
    app: 'activity'
  },
  behavior: {
    method: 'edu.behavior.export',
    app: 'behavior'
  }
}
export var gradeDefault = [
  {p: '1', name: '一年级'},
  {p: '2', name: '二年级'},
  {p: '3', name: '三年级'},
  {p: '4', name: '四年级'},
  {p: '5', name: '五年级'},
  {p: '6', name: '六年级'},
  {p: '7', name: '初一'},
  {p: '8', name: '初二'},
  {p: '9', name: '初三'},
  {p: '10', name: '高一'},
  {p: '11', name: '高二'},
  {p: '12', name: '高三'}
]
