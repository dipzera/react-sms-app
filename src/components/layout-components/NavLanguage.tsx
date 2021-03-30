import * as React from "react";
import { CheckOutlined, GlobalOutlined, DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import { lang } from "assets/data/language.data.json";
import { onLocaleChange } from "redux/actions/Theme";
import { IState } from "redux/reducers";
import { ITheme } from "redux/reducers/Theme";
import { IAuth } from "redux/reducers/Auth";
interface NavLanguageProps {
  [key: string]: any;
}

function getLanguageDetail(locale: string) {
  const data = lang.filter((elm) => elm.langId === locale);
  return data[0];
}

const SelectedLanguage = ({ locale }: { [key: string]: any }) => {
  const language = getLanguageDetail(locale);
  const { langName, icon } = language;

  return (
    <div className="d-flex align-items-center">
      <img
        style={{ maxWidth: "20px" }}
        src={`${process.env.PUBLIC_URL}/img/flags/${icon}.png`}
        alt={langName}
      />
      <span className="font-weight-semibold ml-2">
        {langName} <DownOutlined className="font-size-xs" />
      </span>
    </div>
  );
};

const NavLanguage = ({
  locale,
  configDisplay,
  onLocaleChange,
  triggerType,
}: NavLanguageProps) => {
  const languageOption = (
    <Menu>
      {lang.map((elm) => {
        return (
          <Menu.Item
            key={elm.langId}
            className={
              locale === elm.langId ? "ant-dropdown-menu-item-active" : ""
            }
            onClick={() => {
              onLocaleChange(elm["langId"]);
              // Send language to api
              //
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <img
                  style={{ maxWidth: "20px" }}
                  src={process.env.PUBLIC_URL + `/img/flags/${elm.icon}.png`}
                  alt={elm.langName}
                />
                <span className="font-weight-normal ml-2">{elm.langName}</span>
              </div>
              {locale === elm.langId && <CheckOutlined />}
            </div>
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <Dropdown
      placement="bottomRight"
      overlay={languageOption}
      trigger={[triggerType]}
    >
      {configDisplay ? (
        <a href="#/" className="text-gray" onClick={(e) => e.preventDefault()}>
          <SelectedLanguage locale={locale} />
        </a>
      ) : (
        <Menu style={{ border: "none" }}>
          <Menu.Item>
            <GlobalOutlined className="nav-icon mr-0" />
          </Menu.Item>
        </Menu>
      )}
    </Dropdown>
  );
};

const mapStateToProps = ({ theme, account }: IState) => {
  const { locale } = theme as ITheme;
  return { locale, account };
};
const mapDispatchToProps = {
  onLocaleChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavLanguage);
