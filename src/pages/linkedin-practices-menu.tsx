import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Logo from '../assets/md2practice-logo.svg';
import { fetchLinkedInPracticeInfos, LinkedInPracticeInfo } from '../api/linkedin-practices';

const LinkedInCard: React.FC<LinkedInPracticeInfo> = ({ title, url }) => {
  const handleGA = () => {
    ReactGA.event(
      'select_linkedin_practice',
      {
        github_link: url,
      },
    );
  };

  return (
    <Link to={`/linkedin/${btoa(url)}`} onClick={() => handleGA()}>
      <p
        className="
    bg-primary-dark-800
    rounded-sm
    p-1 pl-3
    shadow font-bold
    cursor-pointer select-none
    hover:bg-secondary-dark-700
    "
        aria-details={url}
      >
        {title}
      </p>
    </Link>
  );
};

const LinkedInPracticesMenuPage: React.FC = () => {
  const [infos, setInfos] = useState<LinkedInPracticeInfo[]>([]);
  const [filteredInfos, setFilteredInfos] = useState<LinkedInPracticeInfo[]>([]);

  const handleFilterOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    const filtered = infos.filter((item) => item.title.toLowerCase().includes(filterValue));
    setFilteredInfos(filtered);
  };

  useEffect(() => {
    fetchLinkedInPracticeInfos().then((data) => {
      setInfos(data);
      setFilteredInfos(data);
    });
    ReactGA.send({ hitType: 'pageview', page: '/' });
  }, []);

  return (
    <>
      <section
        id="hero"
        className="p-4"
      >
        <div className="flex gap-3 justify-around">
          <div className="flex flex-col justify-center desktop:text-4xl">
            <p className="font-bold">
              LinkedIn Practices Collection
            </p>
            <p className="fond-semibold text-neutral-400">
              By MD2Practice
            </p>
          </div>
          <img
            className="hidden desktop:block w-1/4"
            src={Logo}
            alt="logo"
          />
        </div>
      </section>
      <section className="flex flex-col justify-center" id="linkedin-practice-list">
        <input
          className="rounded-full p-2 pl-3 border-2 bg-primary-dark-800"
          type="search"
          name="filter-linkedin"
          id="filter-linkedin"
          autoComplete="off"
          placeholder="Filter"
          onChange={handleFilterOnChange}
        />
        <span className="text-xs mb-4 ml-3 p-1 font-semibold">
          {`Total: ${filteredInfos.length}`}
        </span>
        <ul>
          {filteredInfos.map((item) => (
            <li key={item.title} className="mb-2">
              <LinkedInCard title={item.title} url={item.url} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default LinkedInPracticesMenuPage;
