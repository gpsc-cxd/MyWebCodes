export var data = {
    Dogcode: '',
    Applydate: '',
    Compname: '',
    Name: '',
    Phonenumber: '',
    Dogtype: '',
    Expirationdate: '',
    Remark: '',
    Regionalname: '',
    Regionalcode: '',
    Softwarename: [],
    Servicetype: [],
    Type: ''
};
export var rules = {
    Dogcode: [{ required: true, message: '请输入加密锁编码', trigger: 'blur' }],
    Applydate: [{ required: true, message: '请选择日期', trigger: 'change' }],
    Compname: [{ required: true, message: '请输入公司或部门的名称', trigger: 'blur' }],
    Name: [{ required: true, message: '请输入申请人的姓名', trigger: 'blur' }],
    Dogtype: [{ required: true, message: '请选择加密狗类型', trigger: 'change' }],
    Expirationdate: [{ required: true, message: '请选择日期', trigger: 'change' }],
    Regionalname: [{ required: true, message: '请输入测区名称', trigger: 'blur' }],
    Regionalcode: [{ required: true, message: '请输入测区代码', trigger: 'blur' }],
    Softwarename: [{ type: 'array', required: true, message: '请选择或添加软件名称', trigger: 'change' }, {type:'array', trigger: 'blur' }],
    Servicetype: [{ type: 'array', required: true, message: '请选择办理类型', trigger: 'change' }],
    Type: [{ required: true, required: true, message: '请选择分组', trigger: 'change' }]
}