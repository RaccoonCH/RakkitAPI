import _MODEL_FILE_ from './_MODEL_FILE_'

export default {
  async getAll (req, res) {
    res.send(await _MODEL_FILE_.find())
  }
}
