import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {LikeButton, RepostButton, ShareButton, CommentButton, CollapseButton} from './buttons.js';

function Avatar(props) {
    return (
        <img className="avatar" src={props.src} alt={props.alt}/>
    );
}

function Header(props) {
    return (
        <div className="header">
            <div className="bold-text">
                {props.profileName}
            </div>
            <div className="gray-text">
                {props.profileLink}
            </div>
            <div className="gray-text">
                ·
            </div>
            <div className="gray-text">
                {props.date}
            </div>
        </div>
    );
}

function LinkCard(props) {
    return (
        <div className="link-card">
            <div className="link-card-top">
                <a href={props.link}>
                    <img className="link-card-image" src={props.linkCardImageSrc} alt={props.linkCardImageAlt}/>
                </a>
            </div>
            <div className="link-card-bottom">
                <a href={props.link} className="link-card-info">
                    <div className="link-card-info-text">
                        <div className="bold-text">{props.linkHeader}</div>
                        <div className="link-preview">{props.linkPreview}</div>
                        <div className="gray-text">{props.linkBeauty}</div>
                    </div>
                </a>
            </div>
        </div>
    );
}

function CardInfo(props) {
    return (
        <div className="info">
            <Header profileName={props.profileName}
                    profileLink={props.profileLink}
                    date={props.date}/>
            <CollapseButton collapsed={props.collapsed}
                            collapseButtonOnClick={props.collapseButtonOnClick}/>
        </div>
    );
}

function CardButtons(props) {
    return (
        <div className="card-buttons">
            <CommentButton comments={props.comments}/>
            <RepostButton reposts={props.reposts} reposted={props.reposted} setReposted={props.setReposted}/>
            <LikeButton likes={props.likes} liked={props.liked} setLiked={props.setLiked}/>
            <ShareButton/>
        </div>
    );
}

function findAts(text) {
    const atRegex = /\B@\w+/;
    return text
        .split(/( )/g)
        .map(part =>
            atRegex.test(part) ? <a className="text-link" href={part.slice(1)}>{part} </a> : part
        );
}

function Card(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [liked, setLiked] = useState(false);
    const [reposted, setReposted] = useState(false);

    return (
        <div className="card">
            <Avatar src={props.avatarSrc} alt={props.avatarAlt}/>
            <div className="card-body">
                <CardInfo profileName={props.profileName}
                          profileLink={props.profileLink}
                          date={props.date}
                          collapsed={collapsed}
                          collapseButtonOnClick={() => setCollapsed(!collapsed)}/>
                {collapsed ? null :
                    <div>
                        <div className="card-text">
                            {findAts(props.text)}
                        </div>
                        {props.link ?
                            <div>
                                <LinkCard
                                    linkCardImageSrc={props.linkCardImageSrc}
                                    linkCardImageAlt={props.linkCardImageAlt}
                                    link={props.link}
                                    linkBeauty={props.linkBeauty}
                                    linkHeader={props.linkHeader}
                                    linkPreview={props.linkPreview}
                                />
                            </div> : null}
                        <CardButtons
                            comments={props.comments}
                            likes={props.likes}
                            liked={liked}
                            setLiked={setLiked}
                            reposts={props.reposts}
                            reposted={reposted}
                            setReposted={setReposted}/>
                    </div>
                }

            </div>
        </div>
    );
}

ReactDOM.render(<div>
    <Card likes={189}
          reposts={46}
          comments={2}
          avatarSrc={"https://bit.ly/3umh6OB"}
          avatarAlt={"avatar"}
          profileName={"The Practical Dev"}
          profileLink={"@ThePracticalDev"}
          date={"Sep 10"}
          text={'Learning React? Start Small. \n { author: @dceddia }'}
          linkCardImageSrc="https://pbs.twimg.com/card_img/1488773358397403144/z5udliGi?format=jpg&name=small"
          linkCardImageAlt="react"
          link="https://dev.to/dceddia/learning-react-start-small"
          linkBeauty="dev.to"
          linkHeader="Learning React? Start Small."
          linkPreview="Can't pry yourself away from the tutorials? The cure is to make tiny little experiment apps."
    />
    <Card likes={2003}
          reposts={173}
          comments={26}
          avatarSrc={"https://pbs.twimg.com/profile_images/1487073875229917184/B6lRrumY_400x400.jpg"}
          avatarAlt={"avatar"}
          profileName={"National Park Service\n"}
          profileLink={"@NatlParkService"}
          date={"Sep 11"}
          text={'Visit Yosemite National Park!'}
          linkCardImageSrc="https://bit.ly/3ujmX76"
          linkCardImageAlt="Yosemite"
          link="https://www.nps.gov/yose/index.htm"
          linkBeauty="nps.gov"
          linkHeader="Yosemite National Park (U.S. National Park Service)"
          linkPreview="Yosemite National Park includes nearly 1,200 square miles of mountainous
                             scenery, including high cliffs, deep valleys, tall waterfalls, ancient giant sequoias,
                              and a large wilderness."
    />
</div>, document.getElementById("root"));