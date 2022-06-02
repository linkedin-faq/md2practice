import React from 'react';
import { useParams } from 'react-router-dom';
import GithubPractices from './github-practices/github-practices';

export const LinkedInPracticesPage: React.FC = () => {
  const { encodedUrl } = useParams<{ encodedUrl: string }>();
  const url = atob(encodedUrl || '');

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		let questions = document.querySelectorAll(
			'[aria-label="question-container"]'
		);

		questions.forEach((item: Element, index: number) => {
			(questions[index].parentNode?.parentNode as HTMLElement).style.display =
				item.textContent
					?.toLowerCase()
					.includes(event.target.value.toLowerCase())
					? "block"
					: "none";
		});
	};

  return (
    <React.Fragment>
      <div className="w-full">
        <input
          className="rounded-full w-full p-3 mt-10 border-2 bg-primary-dark-800"
          type="search"
          name="filter-linkedin"
          id="filter-linkedin"
          autoComplete="off"
          placeholder="Filter"
          onChange={handleFilter}
        />
      </div>
			<GithubPractices githubLink={url} />
		</React.Fragment>
  );
};
