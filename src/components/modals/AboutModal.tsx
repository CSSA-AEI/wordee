import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This is a word guessing game themed after Black History Month. Each day 
        will feature a new word and a new information source for you to explore! 

        <br />
        <br />

        <a
          href="https://www.cssa-aei.ca/"
          className="underline font-bold"
        >
          Learn more about CSSA
        </a>{' '}
      </p>
    </BaseModal>
  )
}
