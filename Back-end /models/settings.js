module.exports = (sequelize, DataTypes) => {
    
    const Settings = sequelize.define('settings_table', {
          pk_setting: {
            type: DataTypes.STRING(1),
            allowNull: false,
            primaryKey: true,
            comment: '조회용 PK'
          },
          main_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '메인 테이블에 표시되는 글 수'
          },
          comments_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '최초 댓글 표시 수'
          },
          add_comments_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '추가 로드 댓글 수'
          },
          score_val: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '가입시 최초 부여 점수'
          }
      })

    return Settings
}
