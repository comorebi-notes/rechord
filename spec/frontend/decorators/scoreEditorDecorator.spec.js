import * as scoreEditorDecorator from '../../../app/frontend/decorators/scoreEditorDecorator'

test('parse multi-line chord progression', () => {
  expect(scoreEditorDecorator.parseChordProgression('Gm/CF69|Gm/C\nAbGaug7|'))
    .toEqual(
      [
        [
          [['G', 'm/C'], ['F', '69']], [['G', 'm/C']]
        ],
        [
          [['Ab', ''], ['G', 'aug7']]
        ]
      ]
    )
})
