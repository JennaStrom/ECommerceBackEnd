const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagInfo)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagInfo) {
      res.status(404).json({message: 'No Tag found with this ID'});
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.status(200).json(tag);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagInfo = Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(tagInfo => res.status(200).json(tagInfo))
    .catch((err) => {
      res.status(500).json(err)
    })
});

module.exports = router;
