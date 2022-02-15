import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'
import { WORDS } from '../../constants/wordlist'
import {
  solution
} from '../../lib/words'
import { Text } from 'react-native'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
  isHardMode: boolean
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  isHardMode,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >

      <div style={{ backgroundColor: '#697990', border: '2px', borderRadius: '0.30rem', paddingBottom: '1rem' }}>

        <div style={{ backgroundColor: '#535f71', padding: '0.2rem', border: '2px', borderTopLeftRadius: '0.30rem', borderTopRightRadius: '0.30rem' }}>
          <Text style={{ color: 'white', backgroundColor: '#535f71', fontWeight: 'bold' }}>
            {"Check out this "}
            {`${WORDS.find((w) => w.name === solution.toLowerCase())?.type}`}
            {"!"}
          </Text>
        </div>
        <div style={{ padding: '0.5rem' }}>
          <Text style={{ color: 'white', fontWeight: 'normal', fontSize: 18 }}>
            {`${WORDS.find((w) => w.name === solution.toLowerCase())?.title}`}
          </Text>
        </div>

        <button style={{ backgroundColor: '#2563eb', paddingLeft: '0.7rem', paddingRight: '0.7rem', paddingTop: '0.4rem', paddingBottom: '0.4rem', fontSize: 15, border: '2px', borderRadius: '0.30rem', color: 'white' }}>
          <a href={WORDS.find((w) => w.name === solution.toLowerCase())?.url}>
            Learn More
          </a>

        </button>

      </div>


      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, isGameLost, isHardMode)
              handleShare()
            }}
          >
            {SHARE_TEXT}
          </button>
        </div>
      )}
    </BaseModal>
  )
}
