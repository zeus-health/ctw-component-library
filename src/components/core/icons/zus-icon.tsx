type ZusIconProps = {
  className?: string;
  includeZusText?: boolean;
};
export const ZusIcon = ({ className, includeZusText = false }: ZusIconProps) => (
  <svg viewBox="0 0 47 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <title>Zus Health</title>
    <g clip-path="url(#clip0_105_5210)">
      <path
        d="M17.8781 17.222L12.2169 13.9545L16.2985 6.88471C16.3251 6.83922 16.3722 6.75608 16.2985 6.62745C16.2247 6.49882 16.1275 6.49882 16.0757 6.49882H7.91101V-0.0392151H16.0757C18.5322 -0.0392151 20.7314 1.2298 21.9596 3.35686C23.1879 5.48392 23.1879 8.02353 21.9596 10.1506L17.8781 17.2204V17.222Z"
        fill="#008051"
      />
      <path
        d="M15.453 24H7.36357C4.9071 24 2.70788 22.731 1.47965 20.6039C0.251413 18.4769 0.251413 15.9372 1.47965 13.8102L5.56122 6.74039L11.2208 10.0078L7.13926 17.0776C7.11259 17.1231 7.06553 17.2063 7.13926 17.3349C7.21298 17.4635 7.31024 17.4635 7.362 17.4635H15.4514V24H15.453Z"
        fill="#71B2C9"
      />
      {includeZusText && (
        <>
          <path
            d="M30.8098 10.4283C30.9211 10.4283 30.9619 10.4973 30.9619 10.5945V10.8988C30.9619 11.0369 30.976 11.12 30.838 11.3145L27.1862 16.3498H31.0874V17.1388H26.2325C26.1211 17.1388 26.0804 17.0839 26.0804 16.9867V16.6683C26.0804 16.5302 26.0662 16.4471 26.2043 16.2526L29.8294 11.2173H26.1353V10.4283H30.8113H30.8098Z"
            fill="#008051"
          />
          <path
            d="M38.016 10.4283H38.9698V16.2526C38.9698 16.5161 38.8866 16.6808 38.6231 16.7922L37.9313 17.0683C37.6129 17.1922 37.4749 17.2204 37.1298 17.2204H35.0137C34.4882 17.2204 34.2529 17.1232 33.9486 16.8188L33.5894 16.4596C33.216 16.0863 33.1611 15.9483 33.1611 15.3255V10.4283H34.1149V15.3537C34.1149 15.5749 34.1556 15.6581 34.3219 15.8243L34.6403 16.1428C34.8207 16.309 34.8756 16.3373 35.1517 16.3373H37.0749C37.158 16.3373 37.2411 16.3232 37.3102 16.2949L37.9329 16.0455C37.9878 16.0173 38.016 15.9906 38.016 15.9216V10.4298V10.4283Z"
            fill="#008051"
          />
          <path
            d="M42.471 14.1224C42.0427 14.0816 41.7102 13.9702 41.489 13.7632C41.2537 13.542 41.1298 13.1969 41.1298 12.6573V12.2149C41.1298 11.6612 41.1847 11.4824 41.558 11.1075L41.9173 10.7482C42.2357 10.4439 42.471 10.3467 42.9965 10.3467H44.4067C44.8914 10.3467 45.0984 10.389 45.431 10.5961L46.2059 11.0667L45.8325 11.7443L44.8914 11.3161C44.6984 11.233 44.5588 11.2047 44.311 11.2047H43.1078C42.8318 11.2047 42.7753 11.233 42.5965 11.3992L42.2639 11.7318C42.0976 11.8981 42.0569 11.9812 42.0569 12.2024V12.7137C42.0569 13.073 42.1541 13.1984 42.5416 13.2392L45.0733 13.4745C45.5988 13.5294 45.9031 13.6408 46.1243 13.862C46.3455 14.0831 46.4427 14.4157 46.4427 14.8863V15.3286C46.4427 15.9514 46.3878 16.0894 46.0145 16.4628L45.6553 16.822C45.351 17.1263 45.1157 17.2235 44.5902 17.2235H42.8192C42.3345 17.2235 42.1274 17.1812 41.7823 16.9741L41.0074 16.5035L41.3808 15.8259L42.322 16.2682C42.5149 16.3514 42.6545 16.3655 42.9024 16.3655H44.4663C44.7424 16.3655 44.7988 16.3373 44.9776 16.171L45.3102 15.8384C45.4765 15.6722 45.5173 15.589 45.5173 15.3679V14.8832C45.5173 14.5239 45.42 14.3984 45.0325 14.3577L42.4725 14.1224H42.471Z"
            fill="#008051"
          />
        </>
      )}
    </g>
    <defs>
      <clipPath id="clip0_105_5210">
        <rect width="45.8039" height="24" fill="white" transform="translate(0.598022)" />
      </clipPath>
    </defs>
  </svg>
);
